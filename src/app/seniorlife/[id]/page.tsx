"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SeniorlifeRequestDetailDto } from "@/dto";
import serniorlifeService from "@/services/seniorlife/seniorlife.service";
import { API_STATUS_CODE_ENUM } from "@/common";
import { SeniorlifePostDetailModel } from "@/models";

export default function SeniorLifeDetail() {
  const { id } = useParams();

  const seniorLifeRequestDetailDto = new SeniorlifeRequestDetailDto();
  const [seniorLifeDetail, setSeniorLifeDetail] =
    useState<SeniorlifePostDetailModel>();

  useEffect(() => {
    getSeniorlifeDetail();
  }, []);

  const getSeniorlifeDetail = async () => {
    seniorLifeRequestDetailDto.id = id as string;

    await seniorLifeRequestDetailDto.validateDto();
    if (seniorLifeRequestDetailDto.isValid) {
      const res = await serniorlifeService.findSeniorLifeDetail(
        seniorLifeRequestDetailDto
      );

      console.log("res", res);

      if (res && res.status === API_STATUS_CODE_ENUM.STATUS_200) {
        setSeniorLifeDetail(res.data.data);
      }
    }
  };

  return (
    <div>
      <h1>detail Example</h1>
      {seniorLifeDetail && (
        <table border={1}>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{seniorLifeDetail.seniorLife.id}</td>
              <td>{seniorLifeDetail.seniorLife.title}</td>
              <td>{seniorLifeDetail.seniorLife.description}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
