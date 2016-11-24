import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class LeanCloudBudget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUsers: 10,
      dailyUsersPercent: 10,
      dailyActiveDuration: 20,
      dailyActiveHours: 4,
      requestPerMinute: 5,
      responseTime: 20
    };
  }

  render() {
    const onChanged = varName => {
      return ({target}) => {
        this.setState({
          [varName]: target.value
        });
      }
    };

    const {totalUsers, dailyUsersPercent, dailyActiveDuration, dailyActiveHours, requestPerMinute, responseTime} = this.state;

    const requestPreDay = totalUsers * 10000 * (dailyUsersPercent * 0.01) * dailyActiveDuration * requestPerMinute;
    const qps = requestPreDay / (dailyActiveHours * 3600);
    const concurrency = qps / (1000 / responseTime);

    return <div>
      <div className='well'>
        <strong>用户数量（{totalUsers} 万）</strong> &nbsp;
        <ReactBootstrapSlider value={totalUsers} min={1} max={1000} change={onChanged('totalUsers')}/>
        <div>你的应用的总用户数量（肯定有不少水分，你懂的）</div>
      </div>
      <div className='well'>
        <strong>每日活跃用户比例（{dailyUsersPercent}%）</strong> &nbsp;
        <ReactBootstrapSlider value={dailyUsersPercent} min={1} max={100} change={onChanged('dailyUsersPercent')}/>
        <div>其实这些用户里没多少人会每天打开你的应用</div>
      </div>
      <div className='well'>
        <strong>平均每日用户活跃时间（{dailyActiveDuration} 分钟）</strong> &nbsp;
        <ReactBootstrapSlider value={dailyActiveDuration} min={1} max={60} change={onChanged('dailyActiveDuration')}/>
        <div>平均每个用户每天打开你的应用的时间（iPhone 用户可以在「电池统计」里看到你使用每个应用的时间）</div>
      </div>
      <div className='well'>
        <strong>每分钟请求数量（{requestPerMinute} 次）</strong> &nbsp;
        <ReactBootstrapSlider value={requestPerMinute} min={1} max={30} change={onChanged('requestPerMinute')}/>
        <div>你的应用在活跃的状态下每分钟发起的请求数量</div>
      </div>
      <div className='well'>
        <strong>平均响应时间（{responseTime} 毫秒）</strong> &nbsp;
        <ReactBootstrapSlider value={responseTime} min={10} max={1000} change={onChanged('responseTime')}/>
        <div>复杂的查询需要更长的处理时间</div>
      </div>
      <div className='well'>
        <strong>用户主要活跃时间段（{dailyActiveHours} 小时）</strong> &nbsp;
        <ReactBootstrapSlider value={dailyActiveHours} min={1} max={8} change={onChanged('dailyActiveHours')}/>
        <div>大多数用户会集中在傍晚的几个小时里使用你的应用</div>
      </div>
      <div className='well'>
        <ul>
          <li>每日请求量 {(requestPreDay / 10000).toFixed(1)} 万</li>
          <li>最高 QPS {qps.toFixed(0)}</li>
          <li>最高并发 {concurrency.toFixed(1)}</li>
        </ul>
      </div>
    </div>;
  }

}

ReactDOM.render(<LeanCloudBudget />, document.getElementById('react-root'));
