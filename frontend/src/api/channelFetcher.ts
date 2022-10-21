import customAxios from "@/util/customAxios";
import Storage from "@/storage/storage";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";

export async function createChannelRequest(
  endPoint: string,
  {
    title,
    locationDist,
    selectedCity,
    memberNum,
    spec,
    image,
  }: ChannelFormInitialType
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("locationDist", locationDist);
  selectedCity && formData.append("locationCity", selectedCity);
  formData.append("memberNum", memberNum.toString());
  formData.append("spec", spec);
  formData.append("image", image as File);
  const res = await customAxios.post(endPoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function currentChannelListRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function currentChannelDetailRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      "Content-Type": "aplication/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function loginUserChannelListRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      "Content-Type": "aplication/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelEnterRequest(endPoint: string, message: string) {
  const res = await customAxios.put(
    endPoint,
    {
      message: message,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    }
  );
  return res.data;
}
export async function channelEnteredCancelRequest(endPoint: string) {
  const res = await customAxios.delete(endPoint, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelJoinAcceptRequet(
  endPoint: string,
  waitingId: string
) {
  const res = await customAxios.put(
    endPoint,
    {
      waitingId: waitingId,
    },
    {
      headers: {
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    }
  );
  return res.data;
}

export async function channelJoinRejectRequet(
  endPoint: string,
  waitingId: string
) {
  const res = await customAxios.delete(endPoint, {
    data: { waitingId: waitingId },
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelLeaveRequest(endPoint: string) {
  const res = await customAxios.delete(endPoint, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelDeleteRequest(endPoint: string) {
  const res = await customAxios.delete(endPoint, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}
