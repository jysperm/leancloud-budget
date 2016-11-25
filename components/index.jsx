import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class LeanCloudBudget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUsers: 10,
      dailyUsersPercent: 10,
      sessionsPerDay: 10,
      dailyActiveHours: 4,
      requestsPerSession: 5,
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

    const {totalUsers, dailyUsersPercent, sessionsPerDay, dailyActiveHours, requestsPerSession, responseTime} = this.state;

    const requestPreDay = totalUsers * 10000 * (dailyUsersPercent * 0.01) * sessionsPerDay * requestsPerSession;
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
        <strong>用户平均每日打开次数（{sessionsPerDay} 次）</strong> &nbsp;
        <ReactBootstrapSlider value={sessionsPerDay} min={1} max={30} change={onChanged('sessionsPerDay')}/>
        <div>平均每个用户每天打开你的应用的次数</div>
      </div>
      <div className='well'>
        <strong>用户单次打开请求数量（{requestsPerSession} 次）</strong> &nbsp;
        <ReactBootstrapSlider value={requestsPerSession} min={1} max={30} change={onChanged('requestsPerSession')}/>
        <div>用户每次打开你的应用所产生的请求数量</div>
      </div>
      <div className='well'>
        <strong>平均响应时间（{responseTime} 毫秒）</strong> &nbsp;
        <ReactBootstrapSlider value={responseTime} min={15} max={50} ticks={[15, 20, 30, 50]}
          ticks_positions={[0, 20, 50, 100]} ticks_snap_bounds={20}
          ticks_labels={["15ms", "20ms", "30ms", "50ms"]} change={onChanged('responseTime')}/>
        <div>复杂的查询需要更长的处理时间：20ms 是通常的平均响应时间；如果你的请求都是对单个对象查询那么可以选择 15ms；如果你的应用每次都会查询大量的对象那么可以选择 30ms；如果你的应用每次都用复杂的筛选和排序条件查询大量对象那么可以选择 50ms</div>
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
