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
<<<<<<< HEAD
    key:"Big",
    default:false
})
=======
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
    key:"roadmap",
    default: {
        
    }
})
>>>>>>> 56c88d1c53e4dd06d6d1b1ec9a59c5df00d4042b
