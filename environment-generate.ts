const awsParamStore = require("aws-param-store");
const fs00 = require("fs");
const dotenv = require("dotenv");

const targetPath = "./.env";

dotenv.config({ path: "./.env.generate" });

const _awsOptions = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_SSM_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SSM_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_AWS_SSM_REGION || "ap-northeast-2",
};

// TODO: 환경에 맞게 변수명 지정
const _awsParameterStore = `test_prj_${process.env.AWS_ENV}_env_var`;
console.log("_awsParameterStore", _awsParameterStore);

let awsKeyValueParameter = "";
const _awsKeyValueParameter = awsParamStore.getParameterSync(
  _awsParameterStore,
  _awsOptions
);

if (_awsKeyValueParameter && _awsKeyValueParameter.Value) {
  try {
    awsKeyValueParameter = JSON.parse(_awsKeyValueParameter.Value);
  } catch (error) {
    throw console.error(error, "PARSING ERROR");
  }
}

// set parameter store keys to env
let envConfigFile = ``;
Object.keys(awsKeyValueParameter).forEach((key) => {
  console.log("key", key);
  envConfigFile += `${key}=${awsKeyValueParameter[key]}\n`;
});

fs00.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(envConfigFile);
    console.log(`.env generated correctly at ${targetPath} \n`);
  }
});
