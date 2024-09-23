"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthRequestDto } from "@/dto/auth/auth-request.dto";
import { validate, ValidationError } from "class-validator";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const authRequestDto = new AuthRequestDto();

  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    authRequestDto.username = username;
    authRequestDto.password = password;

    await authRequestDto.validateDto();

    if (authRequestDto.isValid) {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError("아이디와 비밀번호가 일치하지 않습니다.");
      } else {
        router.push("/");
      }
    } else {
      if (authRequestDto.errors.username) {
        setError(authRequestDto.errors.username);
      } else if (authRequestDto.errors.password) {
        setError(authRequestDto.errors.password);
      }
    }

    console.log(authRequestDto.errors);
  };

  // 클라이언트 IP 주소 가져오기
  useEffect(() => {
    setPort(window.location.port);
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setIp(data.ip); // IP 주소 설정
      } catch (error) {
        console.error("IP 주소를 가져오지 못했습니다.", error);
      }
    };

    fetchIp();
  }, []);

  return (
    <div>
      <h1>Login</h1>
      {/* 포트 및 IP 정보 출력 */}
      <div>
        <p>현재 포트: {port || "포트 정보를 가져올 수 없습니다."}</p>
        <p>현재 IP 주소: {ip || "IP 정보를 가져오는 중입니다..."}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </div>
        {authRequestDto.username}

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        {authRequestDto.errors?.password && (
          <p> {authRequestDto.errors.password}</p>
        )}
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
