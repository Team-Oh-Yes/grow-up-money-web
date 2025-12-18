import { atom } from "recoil";

// 1. 로그인 및 회원가입 상태
export const Loginstate = atom({
  key: "Loginstate",
  default: false,
});

export const Signupstate = atom({
  key: "Signupstate",
  default: false,
});

// 2. 화면 크기 관련 상태
export const Mobilestate = atom({
  key: "Mobilestate",
  default: false,
});

export const Big = atom({
  key: "Big",
  default: false,
});

// 3. 퀴즈 및 로드맵 데이터 상태
export const Show = atom({
  key: "story", // 기존 키 유지
  default: true,
});

export const quizProgressState = atom({
  key: "quizProgressState",
  default: {
    TF: false,
    score: 0,
    totalQuestions: 0,
  },
});

export const roadmapdata = atom({
  key: "roadmap", // 기존 키 유지
  default: {},
});

// 4. 유저 자산 상태 (실시간 연동의 핵심)
export const userBalanceState = atom({
  key: "userBalanceState",
  default: {
    pointBalance: 0, // 다이아몬드
    boundPoint: 0,   // 포인트
    gachaTickets: 0, // 티켓
    hearts: 0,       // 하트
  },
});

export const Testheart = atom({
  key: "heart", // 기존 키 유지
  default: 0,
});

// 5. 유저 정보 및 트리거
export const userInfoState = atom({
  key: "userInfoState",
  default: null,
});

export const userStatsUpdateTrigger = atom({
  key: "userStatsUpdateTrigger",
  default: 0, // 수치 변화를 알리는 트리거
});