import React from "react";
import "../../style/home/index.scss";
import imageURL from "../../assets/images/del_btn.svg";

const TodoList = () => {
  return (
    <ul className="list">
      <li className="list_item">
        <div className="event_head">
          <div className="content">这是内容区域</div>
          <img className="btn_del" src={imageURL} alt="" />
        </div>
        <div className="event_footer">
          <div className="done_time">完成时间：2020/10/10</div>
          <div className="created_time">创建时间：2018/09/09</div>
        </div>
      </li>
      <li className="list_item done">
        <div className="event_head">
          <div className="content">这是内容区域这是内容区域这是内容区域这是内容区域这是内容区域这是内容区域</div>
          <img className="btn_del" src={imageURL} alt="" />
        </div>
        <div className="event_footer">
          <div className="done_time">完成时间：2020/10/10</div>
          <div className="created_time">创建时间：2018/09/09</div>
        </div>
      </li>
    </ul>
  );
};

export default () => {
  return (
    <div className="home">
      <header className="home_header">
        <h1>TODO</h1>
        <div className="input">
          <input type="text" className="input_text" />
          <div className="input_btn">添加</div>
        </div>
      </header>
      <div className="container">
        <nav className="nav">
          <div className="nav_item">全部</div>
          <div className="nav_item">未完成</div>
          <div className="nav_item nav_item-active">已完成</div>
        </nav>
        <TodoList />
      </div>
    </div>
  );
};
