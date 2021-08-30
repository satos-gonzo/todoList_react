import React from 'react';
import _ from 'lodash';
import { Task } from './Task';

/*-----------------------------------
// メモ
//-----------------------------------*/
// TodoListでは一意なidを生成してTask1つ1つを管理できるようにする

/* クラスの定義 */
export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  /* handleRemove */
  // CollectionからTaskを削除する処理（DOM削除ではない）
  handleRemove(id) {
    this.props.callBackRemoveTask(id);
  }

  /* render */
  render() {
    // stateの配列を展開して、idやtext等のプロパティを指定できるようにする
    // <Task />をループ処理内に入れて、配列にpushして上記を加える
    let Tasks = [];
    for (let i in this.props.data) {
      Tasks.push(<Task
        key={this.props.data[i].id}
        id={this.props.data[i].id}
        text={this.props.data[i].text}
        onRemove={this.handleRemove}
      />);
    }

    return (
      <ul className="list js-todo_list">
        {Tasks}
      </ul>
    );
  }
}
