export class StringUtil {
  /**
   *
   * @param phoneNumber 01011112222
   * @returns 010-****-2222
   */
  public maskPhoneNumber(phoneNumber: string): string {
    if (phoneNumber) {
      // 정규식을 사용하여 숫자가 아닌 문자를 제거합니다.
      const cleaned = phoneNumber.replace(/\D/g, "");

      if (cleaned.length !== 11) {
        throw new Error("Invalid phone number format. Must be 11 digits.");
      }

      const part1 = cleaned.slice(0, 3);
      const part2 = cleaned.slice(3, 7).replace(/\d/g, "*");
      const part3 = cleaned.slice(7);

      return `${part1}-${part2}-${part3}`;
    } else {
      return "";
    }
  }

  /**
   *
   * 시니어 라이프 카테고리 세팅 Utils
   *
   */
  public settingsCategory(categoryName: string = "", eventStatus: string) {
    if (categoryName !== "") {
      return categoryName;
    } else {
      if (eventStatus === "E") {
        return "진행 예정";
      } else if (eventStatus === "P") {
        return "진행중";
      } else {
        return "진행 종료";
      }
    }
  }

  //숫자 콤마처리
  public numberFormatter(price: number): string {
    return price.toLocaleString();
  }
}
