import UUID from "../utils/uuid";
import { saveData, getData } from "../utils/storage";

export interface IEventItem {
  id: string;
  text: string;
  status: number;
  createdTime: number;
  doneTime?: number;
}
export interface IState {
  eventList: Array<IEventItem>;
}

const initState: IState = {
  eventList: getData("event_list") || [],
};

const ADD_EVENT = "ADD_EVENT";
const DEL_EVENT = "DEL_EVENT";
const DONE_EVENT = "DONE_EVENT";
const RESET_EVENT = "RESET_EVENT";


export const addEvent = (text: string) => {
  return {
    type: ADD_EVENT,
    text: text,
  };
};

export type ID = string;

export const delEvent = (id: ID) => {
  return {
    type: DEL_EVENT,
    id: id,
  };
};

export const doneEvent = (id: ID) => {
  return {
    type: DONE_EVENT,
    id: id,
  };
};

export const resetEvent = (id: ID) => {
  return {
    type: RESET_EVENT,
    id: id,
  };
};

interface IPayload {
  type?: string;
  text?: string;
  id?: string;
}

export default (state: IState = initState, { type, text, id }: IPayload) => {
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
      const newList = [...state.eventList, event];
      saveData("event_list", newList);
      return {
        eventList: newList,
      };
    }
    case DONE_EVENT: {
      // 完成事件
      const newList = state.eventList.map((item) => {
        if (item.id === id) {
          item.status = 1;
          item.doneTime = new Date().getTime();
        }
        return item;
      });
      saveData("event_list", newList);
      return {
        eventList: newList,
      };
    }
    case RESET_EVENT: {
      //重置事件
      const newList = state.eventList.map((item) => {
        if (item.id === id) {
          item.status = 0;
          item.doneTime = -1;
        }
        return item;
      });
      saveData("event_list", newList);
      return {
        eventList: newList,
      };
    }
    case DEL_EVENT: {
      // 删除事件
      const newList = state.eventList.filter((item) => item.id !== id);
      saveData("event_list", newList);
      return {
        eventList: newList,
      };
    }
    default: {
      return state;
    }
  }
};
