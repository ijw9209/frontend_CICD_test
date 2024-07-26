import { debounce, throttle } from "lodash";

export class LodashUtil {
  /**
   * 디바운스 유틸리티 함수
   * @param {Function} func - 호출될 함수
   * @param {number} wait - 디바운스 대기 시간 (밀리초)
   * @param {Object} options - 옵션 객체
   * @returns {Function} - 디바운스된 함수
   */
  public debounceUtil(func, wait, options = {}) {
    return debounce(func, wait, options);
  }

  /**
   * 쓰로틀 유틸리티 함수
   * @param {Function} func - 호출될 함수
   * @param {number} wait - 쓰로틀 대기 시간 (밀리초)
   * @param {Object} options - 옵션 객체
   * @returns {Function} - 쓰로틀된 함수
   */
  public throttleUtil(func, wait, options = {}) {
    return throttle(func, wait, options);
  }
}
