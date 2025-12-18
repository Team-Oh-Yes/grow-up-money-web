import { atom } from "recoil";

export const Loginstate = atom({
  key: "Loginstate",
  default: false,
});

export const Signupstate = atom({
  key: "Signupstate",
  default: false,
});

export const Mobilestate = atom({
  key: "Mobilestate",
  default: false,
});
export const Big = atom({
  key: "Big",
  default: false,
});
export const Show = atom({
  key: "story",
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
  key: "roadmap",
  default: {},
});
export const Testheart = atom({
  key: "heart",
  default: 3,
});
// atoms.js 에 추가
export const userStatsUpdateTrigger = atom({
  key: "userStatsUpdateTrigger",
  default: 0, // 숫자를 증가시켜 리렌더링 트리거
});
