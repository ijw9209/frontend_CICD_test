import { ValidationError, validate } from "class-validator";

export class BaseDto {
  constructor(partial?: Object) {
    Object.assign(this, partial);
    this.errors = {};
  }

  // error handling
  public errors: any;

  public get isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  public async validateDto() {
    const result = await validate(this);
    this.errors = this.setErrors(result);
  }

  public setErrors(result: ValidationError[]): any {
    let propBag = [];

    result.map((error) => {
      for (const key in error.constraints) {
        if (Object.prototype.hasOwnProperty.call(error.constraints, key)) {
          let message = error.constraints[key];
          (propBag as any)[error.property] = message;
        }
      }
    });

    return propBag;
  }

  protected exclude(property: string | { [x: string]: string[] }): this {
    if (property) {
      if (typeof property === "object") {
        Object.keys(property).forEach((k) => {
          if (typeof this[k] === "object") {
            Object.keys(this[k]).forEach((k2) => {
              delete this[k][k2];
            });
          }
        });
      } else {
        delete this[property];
      }
    }
    return this;
  }
}
