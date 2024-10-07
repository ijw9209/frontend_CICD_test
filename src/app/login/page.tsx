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
    // pull request Test
    console.log(authRequestDto.errors);
  };

  return (
    <div>
      <h1>Login</h1>
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
