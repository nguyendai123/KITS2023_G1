import "./GroupPage.css";
import Header from "../Header/Header";
import retryHome from "../../assets/retry-home.svg";
import { SearchOutlined, AudioOutlined } from "@ant-design/icons";
import { Space, Input } from "antd";
import { useState } from "react";
import GroupItemJoined from "./GroupItemJoined/GroupItemJoined";
import Footer from "../Footer/Footer";
import { Button, List, Card } from "antd";
import GroupItemSuggest from "./GroupItemSuggest/GroupItemSuggest";
const todos = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const { Meta } = Card;
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const GroupPage = () => {
  const [loading, setLoading] = useState(false);
  const onSearch = () => {
    setLoading(!loading);
    console.log(loading);
  };
  return (
    <>
      <Header />
      <div className="group-container">
        <Space className="group-header">
          <button className="group-retry-home">
            <img
              style={{ width: "20px", height: "20px" }}
              src={retryHome}
              alt="retry"
            />
          </button>
          <div className="group-title">Group</div>
        </Space>
        <div
          style={{
            width: "100%",
          }}
          className="group-search"
        >
          <Search
            style={{
              marginRight: "20px",
            }}
            prefix={<SearchOutlined />}
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
            loading={loading}
          />
          <Button type="primary" size="large">
            Create new group
          </Button>
        </div>
        <div className="group-body">
          <div className="group-body-left">
            <div>Group you joined</div>
            <GroupItemJoined />
            <GroupItemJoined />
            <GroupItemJoined />
            <GroupItemJoined />
            <GroupItemJoined />
          </div>
          <div className="group-body-right">
            <div>Gợi ý nhóm</div>

            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4,
              }}
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "1000"],
                position: "both",
              }}
              dataSource={todos}
              renderItem={(data) => (
                <List.Item>
                  <Card
                    bodyStyle={{
                      backgroundColor: "rgba(255, 0, 0, 0.4)",
                      border: 0,
                      width: "300px",
                    }}
                    bordered={false}
                    key={data}
                    cover={
                      <img
                        style={{
                          height: "150px",
                          width: "300px",
                          objectFit: "cover",
                        }}
                        alt={"ALT"}
                        src="https://source.unsplash.com/random/12"
                      />
                    }
                  >
                    <div className="card-des-group">
                      <div className="group-name">Nghiện Đọc và Viết</div>
                      <div className="number-member-group">
                        <div>21 thành viên</div>

                        <div>0 bài viết/ngày</div>
                      </div>

                      <Button
                        style={{ width: "250px" }}
                        type="primary"
                        shape="round"
                        size="large"
                      >
                        Truy cập nhóm
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GroupPage;
