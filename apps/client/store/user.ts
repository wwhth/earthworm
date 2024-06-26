import { type UserInfoResponse } from "@logto/vue";
import { defineStore } from "pinia";
import { computed, ref, toValue } from "vue";

import { updateUserinfo } from "~/api/userInfo";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<UserInfoResponse>();

  function initUser(userInfoResponse: UserInfoResponse) {
    userInfo.value = userInfoResponse;
  }
  async function updateUserInfo(e: Event) {
    const res = await updateUserinfo({ name: (e.target as HTMLInputElement).value });
    initUser(res!.data as UserInfoResponse);
  }
  const userNameGetter = computed(() => {
    const user = toValue(userInfo);

    if (!user) {
      return "";
    }

    const { username, name, email } = user;
    return name || username || email?.split("@").at(0);
  });

  return {
    initUser,
    userInfo,
    userNameGetter,
    updateUserInfo,
  };
});
