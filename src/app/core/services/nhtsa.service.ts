import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const KNOWN_MAKES = new Set(
  [
    'Acura',
    'Alfa Romeo',
    'Aston Martin',
    'Audi',
    'Bentley',
    'BMW',
    'Buick',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Dodge',
    'Ferrari',
    'Fiat',
    'Ford',
    'Genesis',
    'GMC',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Jaguar',
    'Jeep',
    'Kia',
    'Lamborghini',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Maserati',
    'Mazda',
    'McLaren',
    'Mercedes-Benz',
    'Mini',
    'Mitsubishi',
    'Nissan',
    'Porsche',
    'Ram',
    'Rolls-Royce',
    'Subaru',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo',
  ].map((m) => m.toUpperCase()),
);

const UPPERCASE_EXCEPTIONS = new Set(['BMW', 'GMC']);

function toTitleCase(str: string): string {
  if (UPPERCASE_EXCEPTIONS.has(str.toUpperCase())) return str.toUpperCase();
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

@Injectable({ providedIn: 'root' })
export class NhtsaService {
  private base = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private http: HttpClient) {}

  getMakes(year: number) {
    return this.http
      .get<any>(`${this.base}/GetMakesForVehicleType/car?year=${year}&format=json`)
      .pipe(
        map((res) =>
          (res.Results as { MakeId: number; MakeName: string }[])
            .filter((make) => KNOWN_MAKES.has(make.MakeName.toUpperCase()))
            .map((make) => ({ ...make, MakeName: toTitleCase(make.MakeName) }))
            .sort((a, b) => a.MakeName.localeCompare(b.MakeName)),
        ),
      );
  }

  getModels(year: number, make: string) {
    return this.http
      .get<any>(`${this.base}/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`)
      .pipe(map((res) => res.Results as { Model_ID: number; Model_Name: string }[]));
  }
}
