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
    key:"Big",
    default:false
})
export const Show = atom({
    key:"story",
    default:true
})