

# Dockerfile
# 1단계: 환경 설정 및 dependancy 설치
FROM node:18-alpine AS deps

CMD echo "next-cicd-test..."
RUN apk add --no-cache libc6-compat


# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# 2단계: next.js 빌드 단계
FROM node:18-alpine AS builder


# Docker를 build할때 개발 모드 구분용 환경 변수를 명시함
ARG ENV_MODE 
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
COPY .env .env


# 구축 환경에 따라 env 변수를 다르게 가져가야 하는 경우 환경 변수를 이용해서 env를 구분해준다.
#COPY .env.$ENV_MODE ./.env.production
RUN npm run build


###########################################################


# 3단계: next.js 실행 단계
FROM node:18-alpine AS runner

# 명령어를 실행할 디렉터리 지정
WORKDIR /usr/src/app

# container 환경에 시스템 사용자를 추가함
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static


# 컨테이너의 수신 대기 포트를 3000으로 설정
EXPOSE 3000

# node로 애플리케이션 실행
CMD ["node", "server.js"] 

# standalone으로 나온 결과값은 node 자체적으로만 실행 가능
# CMD ["npm", "start"]