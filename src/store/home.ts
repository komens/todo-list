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
  eventList: IEventItem[];
}

const initState: IState = {
  eventList: getData("event_list") || [],
};

enum EType {
  ADD_EVENT = "ADD_EVENT",
  DEL_EVENT = "DEL_EVENT",
  DONE_EVENT = "DONE_EVENT",
  RESET_EVENT = "RESET_EVENT",
}

function addEventMutation(event) {
  return {
    type: EType.ADD_EVENT,
    event: event,
  };
}
export const addEvent = (text: string) => {
  return (dispatch) => {
    const uuid = UUID();
    const createdTime = new Date().getTime();
    const event = {
      text,
      status: 0,
      id: uuid,
      createdTime,
    };
    dispatch(addEventMutation(event));
  };
};

export type ID = string;

export const delEvent = (id: ID) => {
  return {
    type: EType.DEL_EVENT,
    id: id,
  };
};

export const doneEvent = (id: ID) => {
  return {
    type: EType.DONE_EVENT,
    id: id,
  };
};

export const resetEvent = (id: ID) => {
  return {
    type: EType.RESET_EVENT,
    id: id,
  };
};

interface IPayload {
  type?: string;
  event?: IEventItem;
  id?: string;
}

export default (state: IState = initState, { type, event, id }: IPayload) => {
  switch (type) {
    case EType.ADD_EVENT: {
      // 添加事件
      const newList = [...state.eventList, event];
      saveData("event_list", newList);
      return {
        eventList: newList,
      };
    }
    case EType.DONE_EVENT: {
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
    case EType.RESET_EVENT: {
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
    case EType.DEL_EVENT: {
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
