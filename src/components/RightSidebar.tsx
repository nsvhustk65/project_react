import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <div className="sb-slidebar sb-right sb-style-overlay">
      <h5 className="side-title">Online Customers</h5>
      <ul className="quick-chat-list">
        <li className="online">
          <div className="media">
            <a href="#">
              <img
                alt=""
                src="img/chat-avatar2.jpg"
                className="mr-3 rounded-circle"
              />
            </a>
            <div className="media-body">
              <strong>John Doe</strong>
              <small>Dream Land, AU</small>
            </div>
          </div>
        </li>
        <li className="online">
          <div className="media">
            <a href="#">
              <img
                alt=""
                src="img/chat-avatar.jpg"
                className="mr-3 rounded-circle"
              />
            </a>
            <div className="media-body">
              <div className="media-status">
                <span className="badge bg-important">3</span>
              </div>
              <strong>Jonathan Smith</strong>
              <small>United States</small>
            </div>  
          </div>
        </li>
        <li className="online">
          <div className="media">
            <a href="#">
              <img
                alt=""
                src="img/pro-ac-1.png"
                className="mr-3 rounded-circle"
              />
            </a>
            <div className="media-body">
              <div className="media-status">
                <span className="badge badge-success">5</span>
              </div>
              <strong>Jane Doe</strong>
              <small>ABC, USA</small>
            </div>
          </div>
        </li>
        <li className="online">
          <div className="media">
            <a href="#">
              <img
                alt=""
                src="img/avatar1.jpg"
                className="mr-3 rounded-circle"
              />
            </a>
            <div className="media-body">
              <strong>Anjelina Joli</strong>
              <small>Fockland, UK</small>
            </div>
          </div>
        </li>
        <li className="online">
          <div className="media">
            <a href="#">
              <img
                alt=""
                src="img/mail-avatar.jpg"
                className="mr-3 rounded-circle"
              />
            </a>
            <div className="media-body">
              <div className="media-status">
                <span className="badge bg-warning">7</span>
              </div>
              <strong>Mr Tasi</strong>
              <small>Dream Land, USA</small>
            </div>
          </div>
        </li>
      </ul>

      <h5 className="side-title">Pending Tasks</h5>
      <ul className="p-task tasks-bar">
        {[
          { desc: "Dashboard v1.3", percent: 40, barClass: "bg-success" },
          { desc: "Database Update", percent: 60, barClass: "bg-warning" },
          { desc: "Iphone Development", percent: 87, barClass: "bg-info" },
          { desc: "Mobile App", percent: 33, barClass: "bg-danger" },
          { desc: "Dashboard v1.3", percent: 45, barClass: "" },
        ].map((task, index) => (
          <li key={index}>
            <a href="#">
              <div className="task-info">
                <div className="desc">{task.desc}</div>
                <div className="percent">{task.percent}%</div>
              </div>
              <div className="progress">
                <div
                  style={{ width: `${task.percent}%` }}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={task.percent}
                  role="progressbar"
                  className={`progress-bar progress-bar-striped ${task.barClass}`}
                >
                  <span className="sr-only">{task.percent}% Complete</span>
                </div>
              </div>
            </a>
          </li>
        ))}

        <li className="external">
          <a href="#">See All Tasks</a>
        </li>
      </ul>
    </div>
  );
};

export default RightSidebar;
