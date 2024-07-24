"use client";

import { Fragment, useEffect, useState } from "react";
import { SeniorlifeSearchReqeustDto } from "@/dto";
import { PAGE_URL_ENUM, YN_ENUM } from "@/common";
import SeniorlifeService from "@/services/seniorlife/seniorlife.service";
import { SeniorlifePostModel } from "../models";
import Link from "next/link";

export default function SeniorLife() {
  const [seniorLifePost, setSeniorLifePost] = useState<SeniorlifePostModel[]>(
    []
  );

  const seniorlifeSearchRequestDto: SeniorlifeSearchReqeustDto =
    new SeniorlifeSearchReqeustDto();
  useEffect(() => {
    getSeniorlifePost();
  }, []);

  const getSeniorlifePost = async () => {
    // postList = await

    seniorlifeSearchRequestDto.startDate = "20240623";
    seniorlifeSearchRequestDto.endDate = "20240723";
    seniorlifeSearchRequestDto.categoryId = "8";
    seniorlifeSearchRequestDto.delYn = "N";
    seniorlifeSearchRequestDto.userDisplayYn = YN_ENUM.Y;
    seniorlifeSearchRequestDto.partnerDisplayYn = YN_ENUM.Y;
    seniorlifeSearchRequestDto.caregiverDisplayYn = YN_ENUM.Y;

    await seniorlifeSearchRequestDto.validateDto();

    // parameterSwitcher('/test', seniorlifeSearchRequestDto);
    if (seniorlifeSearchRequestDto.isValid) {
      try {
        const res = await SeniorlifeService.findSeniorLife(
          seniorlifeSearchRequestDto
        );
        console.log("[res data]", res);

        if (res && res?.status === 200) {
          //   console.log(res.data.data?.seniorLife);
          setSeniorLifePost(res.data.data?.seniorLife);
        }
      } catch (error) {
        console.log("Error in findSeniorLife:", error);
      }
    }
  };

  return (
    <div>
      <h1>SeniorLife List 게시판 테스트</h1>
      {seniorLifePost?.length > 0 && (
        <Fragment>
          <table border={1}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
              </tr>
            </thead>
            <tbody>
              {seniorLifePost?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link href={`${PAGE_URL_ENUM.SENIORLIFE_LIST}/${item.id}`}>
                      {item.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
}
