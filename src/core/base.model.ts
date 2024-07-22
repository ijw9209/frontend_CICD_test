export class BaseModel<T> {
  constructor(partial?: Object) {
    Object.assign(this, partial);
  }

  clone(data: T) {
    const newObject = Object.assign(this, data);
    return newObject;
  }

  //   id?: number;
  //   insertId?: number;
  //   insertDt?: Date;
  //   updateId?: number;
  //   updateDt?: Date;
  //   // TODO: class들을 분리해야할 수 있음
  //   // 어떤 모델들은 하위 같이 일자들을 보냄...
  //   updateDatetime?: Date;
  //   insertDateTime?: Date;
  //   // 어떤 모델들은.. 하위 같이 일자들을 보냄
  //   insertDate?: Date;
  //   updateDate?: Date;
}
