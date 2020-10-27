import UUID from "../utils/uuid";

export interface IEventList {
  id: string;
  text: string;
  status: number;
  createdTime: number;
  doneTime?: number;
}

const initState = {
  eventList: [
    {
      id: "00122",
      text: "这里是内容",
      status: 0,
      createdTime: 1603781607694,
      doneTime: 1603781607694,
    },
  ],
};

const ADD_EVENT = "ADD_EVENT";
const DEL_EVENT = "DEL_EVENT";
const DONE_EVENT = "DONE_EVENT";
const RESET_EVENT = "RESET_EVENT";

interface IPayload {
    type?: string,
    text?: string,
    id?: string
}

export const addEvent = (payload: IPayload) => {
  return {
    type: ADD_EVENT,
    text: payload.text,
  };
};

export const delEvent = (payload: IPayload) => {
  return {
    type: DEL_EVENT,
    id: payload.id,
  };
};

export const doneEvent = (payload: IPayload) => {
  return {
    type: DONE_EVENT,
    id: payload.id,
  };
};

export const resetEvent = (payload: IPayload) => {
  return {
    type: RESET_EVENT,
    id: payload.id,
  };
};


export default (state = initState, { type, text, id }: IPayload) => {
  switch (type) {
    case ADD_EVENT: {
      // 添加事件
      const uuid = UUID();
      const createdTime = new Date().getTime();
      const event = {
        text,
        status: 0,
        id: uuid,
        createdTime,
      };
      return {
        eventList: [...state.eventList, event],
      };
    }
    case DONE_EVENT: {
      // 完成事件
      return {
        eventList: state.eventList.map((item) => {
          if (item.id === id) {
            item.status = 1;
            item.doneTime = new Date().getTime();
          }
          return item;
        }),
      };
    }
    case RESET_EVENT: {
      //重置事件
      return {
        eventList: state.eventList.map((item) => {
          if (item.id === id) {
            item.status = 0;
            item.doneTime = -1;
          }
          return item;
        }),
      };
    }
    case DEL_EVENT: {
        console.log("dell")
      // 删除事件
      return {
        eventList: state.eventList.filter((item) => item.id !== id),
      };
    }
    default: {
      return state;
    }
  }
};
