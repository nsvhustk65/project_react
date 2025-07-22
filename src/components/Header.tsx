import React from "react";

function Header() {
  return (
    <header className="header white-bg">
      <div className="sidebar-toggle-box">
        <i className="fa fa-bars"></i>
      </div>

      <a href="index.html" className="logo">
        Flat<span>lab</span>
      </a>

      <div className="nav notify-row" id="top_menu">
        <ul className="nav top-menu">
          <li className="dropdown">
            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
              <i className="fa fa-tasks"></i>
              <span className="badge badge-success">6</span>
            </a>
            <ul className="dropdown-menu extended tasks-bar">
              <div className="notify-arrow notify-arrow-green"></div>
              <li>
                <p className="green">You have 6 pending tasks</p>
              </li>

              {/* Task Item 1 */}
              <li>
                <a href="#">
                  <div className="task-info">
                    <div className="desc">Dashboard v1.3</div>
                    <div className="percent">40%</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "40%" }}
                    >
                      <span className="sr-only">40% Complete (success)</span>
                    </div>
                  </div>
                </a>
              </li>

              {/* Task Item 2 */}
              <li>
                <a href="#">
                  <div className="task-info">
                    <div className="desc">Database Update</div>
                    <div className="percent">60%</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped bg-warning"
                      role="progressbar"
                      aria-valuenow={60}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "60%" }}
                    >
                      <span className="sr-only">60% Complete (warning)</span>
                    </div>
                  </div>
                </a>
              </li>

              {/* Task Item 3 */}
              <li>
                <a href="#">
                  <div className="task-info">
                    <div className="desc">Iphone Development</div>
                    <div className="percent">87%</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressbar"
                      aria-valuenow={87}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "87%" }}
                    >
                      <span className="sr-only">87% Complete</span>
                    </div>
                  </div>
                </a>
              </li>

              {/* Task Item 4 */}
              <li>
                <a href="#">
                  <div className="task-info">
                    <div className="desc">Mobile App</div>
                    <div className="percent">33%</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped bg-danger"
                      role="progressbar"
                      aria-valuenow={33}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "33%" }}
                    >
                      <span className="sr-only">33% Complete (danger)</span>
                    </div>
                  </div>
                </a>
              </li>

              {/* Task Item 5 */}
              <li>
                <a href="#">
                  <div className="task-info">
                    <div className="desc">Dashboard v1.3</div>
                    <div className="percent">45%</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped"
                      role="progressbar"
                      aria-valuenow={45}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "45%" }}
                    >
                      <span className="sr-only">45% Complete</span>
                    </div>
                  </div>
                </a>
              </li>

              <li className="external">
                <a href="#">See All Tasks</a>
              </li>
            </ul>
          </li>

          {/* Inbox */}
          <li id="header_inbox_bar" className="dropdown">
            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
              <i className="fa fa-envelope-o"></i>
              <span className="badge badge-danger">5</span>
            </a>
            <ul className="dropdown-menu extended inbox">
              <div className="notify-arrow notify-arrow-red"></div>
              <li>
                <p className="red">You have 5 new messages</p>
              </li>
              <li>
                <a href="#">
                  <span className="photo">
                    <img alt="avatar" src="img/avatar-mini.jpg" />
                  </span>
                  <span className="subject">
                    <span className="from">Jonathan Smith</span>
                    <span className="time">Just now</span>
                  </span>
                  <span className="message">Hello, this is an example msg.</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="photo">
                    <img alt="avatar" src="img/avatar-mini2.jpg" />
                  </span>
                  <span className="subject">
                    <span className="from">Jhon Doe</span>
                    <span className="time">10 mins</span>
                  </span>
                  <span className="message">Hi, Jhon Doe Bhai how are you ?</span>
                </a>
              </li>
              <li>
                <a href="#">See all messages</a>
              </li>
            </ul>
          </li>

          {/* Notifications */}
          <li id="header_notification_bar" className="dropdown">
            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
              <i className="fa fa-bell-o"></i>
              <span className="badge badge-warning">7</span>
            </a>
            <ul className="dropdown-menu extended notification">
              <div className="notify-arrow notify-arrow-yellow"></div>
              <li>
                <p className="yellow">You have 7 new notifications</p>
              </li>
              <li>
                <a href="#">
                  <span className="label label-danger">
                    <i className="fa fa-bolt"></i>
                  </span>
                  Server #3 overloaded.
                  <span className="small italic">34 mins</span>
                </a>
              </li>
              <li>
                <a href="#">See all notifications</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Top Navigation */}
      <div className="top-nav">
        <ul className="nav pull-right top-menu">
          <li>
            <input
              type="text"
              className="form-control search"
              placeholder="Search"
            />
          </li>
          <li className="dropdown">
            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
              <img alt="" src="img/avatar1_small.jpg" />
              <span className="username">Jhon Doue</span>
              <b className="caret"></b>
            </a>
            <ul className="dropdown-menu extended logout dropdown-menu-right">
              <div className="log-arrow-up"></div>
              <li>
                <a href="#">
                  <i className="fa fa-suitcase"></i>Profile
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-cog"></i> Settings
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-bell-o"></i> Notification
                </a>
              </li>
              <li>
                <a href="login.html">
                  <i className="fa fa-key"></i> Log Out
                </a>
              </li>
            </ul>
          </li>
          <li className="sb-toggle-right">
            <i className="fa fa-align-right"></i>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;