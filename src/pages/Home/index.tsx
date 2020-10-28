import React, { FC, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  addEvent,
  doneEvent,
  resetEvent,
  delEvent,
  IEventItem,
} from "../../store/home";
import "../../style/home/index.scss";
import imageURL from "../../assets/images/del_btn.svg";

const navList = [
  {
    name: "全部",
    key: 1,
  },
  {
    name: "未完成",
    key: 2,
  },
  {
    name: "已完成",
    key: 3,
  },
];

interface ITodoListProps {
  list: Array<IEventItem>;
  dbClick: (status: number, id: string) => void;
  removeEvent: (id: string) => void;
}


const TodoList:FC<ITodoListProps> = ({ list, dbClick, removeEvent }) => {
  return (
    <ul className="list">
      {list.map((item: any) => (
        <li
          className={item.status === 1 ? "list_item done" : "list_item"}
          key={item.id}
          onDoubleClick={() => {
            dbClick(item.status, item.id);
          }}
        >
          <div className="event_head">
            <div className="content">{item.text}</div>
            <img
              className="btn_del"
              src={imageURL}
              alt=""
              onClick={() => {
                removeEvent(item.id);
              }}
            />
          </div>
          <div className="event_footer">
            {item.status === 1 ? (
              <div className="done_time">
                完成时间：{new Date(item.doneTime).toLocaleString()}
              </div>
            ) : null}
            <div className="created_time">
              创建时间：{new Date(item.createdTime).toLocaleString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

interface IHomeProps {
  eventList: Array<IEventItem>;
  addEvent: (text: string) => void;
  doneEvent: (text: string) => void;
  resetEvent: (text: string) => void;
  delEvent: (text: string) => void;
}

const Home:FC<IHomeProps> = ({
  eventList,
  addEvent,
  doneEvent,
  resetEvent,
  delEvent,
}) => {
  const [list, setList] = useState<IEventItem[]>([]);
  const [curNav, setCurNav] = useState(1);

  let inputEle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleUpdateList();
  }, [eventList]);

  // 添加事件
  const handleAddEvent = () => {
    const val = inputEle.current?.value.trim();
    if (!val) {
      return;
    }
    inputEle.current && (inputEle.current.value = "");
    addEvent(val);
  };

  // 导航点击切换
  const handleNavClick = (key: number) => {
    setCurNav(key);
    handleUpdateList(key);
  };

  // 更新列表
  const handleUpdateList = (key: number = curNav) => {
    switch (key) {
      case 1: {
        setList(eventList);
        break;
      }
      case 2: {
        let newList = eventList.filter((item) => item.status === 0);
        setList(newList);
        break;
      }
      case 3: {
        let newList = eventList.filter((item) => item.status === 1);
        setList(newList);
        break;
      }
    }
  };

  // 双击记录
  const handleEventClick = (status: number, id: string) => {
    switch (status) {
      case 0: {
        doneEvent(id);
        break;
      }
      case 1: {
        resetEvent(id);
        break;
      }
    }
  };

  // 删除事件
  const handleDelEvent = (id: string) => {
    const isDel = window.confirm("确定要删除该事件吗？");
    isDel && delEvent(id);
  };

  return (
    <div className="home">
      <header className="home_header">
        <h1>TODO</h1>
        <div className="input">
          <input
            type="text"
            className="input_text"
            ref={inputEle}
            onKeyDown={(e) => {
              e.key === "Enter" && handleAddEvent();
            }}
          />
          <div className="input_btn" onClick={handleAddEvent}>
            添加
          </div>
        </div>
      </header>
      <div className="container">
        <nav className="nav">
          {navList.map((nav) => (
            <div
              className={
                nav.key === curNav ? "nav_item nav_item-active" : "nav_item"
              }
              key={nav.key}
              onClick={() => {
                handleNavClick(nav.key);
              }}
            >
              {nav.name}
            </div>
          ))}
        </nav>
        <TodoList
          list={list}
          dbClick={handleEventClick}
          removeEvent={handleDelEvent}
        />
      </div>
    </div>
  );
};

export default connect(
  (store: any) => {
    return {
      eventList: store.home.eventList,
    };
  },
  {
    addEvent,
    doneEvent,
    resetEvent,
    delEvent,
  }
)(Home);
