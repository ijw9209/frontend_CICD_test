//aws-sdk v2
// const awsParamStore = require("aws-param-store");
// const fs00 = require("fs");
// const dotenv = require("dotenv");

// const targetPath = "./.env";

// dotenv.config({ path: "./.env.generate" });

// const _awsOptions = {
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_SSM_ACCESS_KEY,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SSM_SECRET_KEY,
//   region: process.env.NEXT_PUBLIC_AWS_SSM_REGION || "ap-northeast-2",
// };

// // TODO: 환경에 맞게 변수명 지정
// const _awsParameterStore = `test_prj_${process.env.AWS_ENV}_env_var`;
// console.log("_awsParameterStore", _awsParameterStore);

// let awsKeyValueParameter = "";
// const _awsKeyValueParameter = awsParamStore.getParameterSync(
//   _awsParameterStore,
//   _awsOptions
// );

// if (_awsKeyValueParameter && _awsKeyValueParameter.Value) {
//   try {
//     awsKeyValueParameter = JSON.parse(_awsKeyValueParameter.Value);
//   } catch (error) {
//     throw console.error(error, "PARSING ERROR");
//   }
// }

// // set parameter store keys to env
// let envConfigFile = ``;
// Object.keys(awsKeyValueParameter).forEach((key) => {
//   console.log("key", key);
//   envConfigFile += `${key}=${awsKeyValueParameter[key]}\n`;
// });

// fs00.writeFile(targetPath, envConfigFile, function (err) {
//   if (err) {
//     throw console.error(err);
//   } else {
//     console.log(envConfigFile);
//     console.log(`.env generated correctly at ${targetPath} \n`);
//   }
// });

//aws-sdk v3
//v2 지원 종료로 인해 v3 마이그레이션 코드
// npm i @aws-sdk/client-ssm
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
const fs = require("fs");
const dotenv = require("dotenv");

const targetPath = "./.env";

dotenv.config({ path: "./.env.generate" });

const _awsOptions = {
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_SSM_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SSM_SECRET_KEY,
  },
  region: process.env.NEXT_PUBLIC_AWS_SSM_REGION || "ap-northeast-2",
};

const client = new SSMClient(_awsOptions);

const _awsParameterStore = `test_prj_${process.env.AWS_ENV}_env_var`;
console.log("_awsParameterStore", _awsParameterStore);

const getParameter = async () => {
  try {
    const command = new GetParameterCommand({
      Name: _awsParameterStore,
      WithDecryption: true, // 필요한 경우 암호 해독
    });

    const { Parameter } = await client.send(command);

    if (Parameter && Parameter.Value) {
      let awsKeyValueParameter = {};

      try {
        awsKeyValueParameter = JSON.parse(Parameter.Value);
      } catch (error) {
        console.error("PARSING ERROR", error);
        throw error;
      }

      // set parameter store keys to env
      let envConfigFile = "";
      Object.keys(awsKeyValueParameter).forEach((key) => {
        console.log("key", key);
        envConfigFile += `${key}=${awsKeyValueParameter[key]}\n`;
      });

      fs.writeFile(targetPath, envConfigFile, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log(envConfigFile);
          console.log(`.env generated correctly at ${targetPath} \n`);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching parameter", error);
    throw error;
  }
};

getParameter();
