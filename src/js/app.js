import React from 'react';
import ReactDom from 'react-dom';
import { TodoList } from './components/TodoList';
import { TodoCreater } from './components/TodoCreater';
import { Search } from './components/Search';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { id: this.createHashId(), text: 'sample todo1' },
        { id: this.createHashId(), text: 'sample todo2' },
        { id: this.createHashId(), text: 'sample todo3' }
      ],
      searchText: ''
    }
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
    this.callBackHＡＮＤleToggle = this.callBackHＡＮＤleToggle.bind(this);
  }
  /* 一意なIDを生成する処理 */
  createHashId() {
    let createId = uuidv4();//一意な文字列を生成するライブラリ
    return createId;
  }
  /* Taskを追加する処理 */
  // dataにオブジェクトを追加する
  callBackAddTask(val) {//valueは子コンポーネントから渡ってきたもの
    let nextData = this.state.data;
    console.log('nextDataの中身');
    console.log(nextData);
    nextData.push({ id: this.createHashId(), text: val });//配列にタスクを追加する処理
    this.setState({
      data: nextData//新たスクを追加した状態でstateを更新する
    });
  }
  /* Taskを削除する処理 */
  callBackRemoveTask(id) {
    let data = _.reject(this.state.data, { 'id': id });
    this.setState({
      data: data
    });
  }
  /* 入力したvalueを子コンポーネントに渡す？ */
  callBackSearch(val) {
    this.setState({ searchText: val });
  }
  /* 検索のメソッド */
  filterCollection(element) {
    let regexp = new RegExp('^' + this.state.searchText, 'i');
    return (element.text.match(regexp));
  }
  /* 追加：検索して元に戻してもTaskが元に戻らないようにする */
  callBackHＡＮＤleToggle(taskData) {
    taskData['isDone'] = !taskData['isDone'];
    this.ＳＥＴState(prevState => ({
      data: prevState.data.map(obj => (obj.id === taskData['id'] ?
        Object.assign(obj, { isDone: taskData['isDone'] }) : obj))
    }));
  }


  render() {
    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    return (
      <div>
        <TodoCreater callBackAddTask={this.callBackAddTask} />

        <Search callBackSearch={this.callBackSearch} />

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} />
      </div >

    );
  }
}

ReactDom.render(
  <TodoApp />,
  document.getElementById('app')
);
