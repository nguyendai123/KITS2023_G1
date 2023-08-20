import Cookies from "js-cookie";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Input } from "antd";
import "./Home.css";
import { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import likeicon from "../../assets/like.svg";
import iconlike from "../../assets/iconlike.svg";
import funnyicon from "../../assets/funny.svg";
import loveicon from "../../assets/love.svg";
import commenticon from "../../assets/iconcomment.svg";
import iconshare from "../../assets/iconshare.svg";
import { Collapse } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items_comments = [
  {
    key: "1",

    children: <p>{text}</p>,
  },
];
const items = [
  {
    label: (
      <a
        className="
    dropdown-item
    d-flex
    justify-content-around
    align-items-center
    fs-7
  "
        href="#"
      >
        Edit Post
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        className="
    dropdown-item
    d-flex
    justify-content-around
    align-items-center
    fs-7
  "
        href="#"
      >
        Delete Post
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const topRatedApiStatuses = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const [topRatedApiStatus, setTopRatedApiStatus] = useState(
    topRatedApiStatuses.initial
  );
  const [openComment, setOpenComment] = useState(false);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    getTopRatedBooks();
  }, []);

  const getTopRatedBooks = async () => {
    setTopRatedApiStatus(topRatedApiStatuses.inProgress);

    const topRatedBooksApi = "https://apis.ccbp.in/book-hub/top-rated-books";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(topRatedBooksApi, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const booksList = fetchedData.books;
      const updatedData = booksList.map((eachBook) => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }));
      setTopRatedApiStatus(topRatedApiStatuses.success);
      setTopRatedBooks(updatedData);
    } else {
      setTopRatedApiStatus(topRatedApiStatuses.failure);
    }
  };

  const onClickRetry = () => {
    getTopRatedBooks();
  };

  const onClickFindBooks = () => {
    return navigate("/shelf");
  };

  const RenderSliderSuccessView = () => {
    return (
      <Slider {...settings}>
        {topRatedBooks.map((eachBook) => {
          const { id, title, coverPic, authorName } = eachBook;
          const onClickedTopRatedBook = () => {
            navigate(`/books/${id}`);
          };

          return (
            <div className="top-rated-home-item-container" key={id}>
              <button
                onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="top-rated-home-image-container">
                  <img
                    className="top-rated-home-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-home-name">{title}</h1>
                <p className="top-rated-home-author">{authorName}</p>
              </button>
            </div>
          );
        })}
      </Slider>
    );
  };

  const RenderSliderProgressView = () => (
    <div className="loader-container">
      <TailSpin color="#8284C7" height={50} width={50} />;
    </div>
  );

  const RenderSliderViewFailure = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={() => onClickRetry()}
        type="button"
      >
        Try Again
      </button>
    </div>
  );
  const renderSlider = () => {
    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return (
          <>
            <RenderSliderSuccessView />
          </>
        );
      case topRatedApiStatuses.inProgress:
        return (
          <>
            <RenderSliderProgressView />
          </>
        );
      case topRatedApiStatuses.failure:
        return (
          <>
            <RenderSliderViewFailure />
          </>
        );
      default:
        return null;
    }
  };
  const handleClickComment = () => {
    setOpenComment(true);
  };
  return (
    <>
      <Header page="home" />
      <div className="home-page-container">
        <div className="home-page-left-container">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Input
            style={{ width: "1200px", margin: "10px 0" }}
            type="text"
            className="input-home"
            placeholder="Tạo bài viết của bạn"
          />
        </div>
        <div className="home-page-right-container">
          <div className="home-top-rated-container">
            <div className="top-rated-heading-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
            </div>
            <div className="slick-container">{renderSlider()}</div>
          </div>
        </div>
      </div>

      {/* p 1 */}
      <div>
        <div className="post-card">
          {/* author */}
          <div className="author-des">
            {/* avatar */}
            <div className="avatar">
              <img
                src="https://source.unsplash.com/collection/happy-people"
                alt="avatar"
                className="avatar-images"
                style={{ width: 38, height: 38, objectFit: "cover" }}
              />
              <div className="author-des-post">
                <p className="author-name">John</p>
                <span className="post-createat">July 17 at 1:23 pm</span>
              </div>
            </div>
            {/* edit */}

            {/* edit menu */}
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <svg
                    type="button"
                    id="post1Menu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
                  </svg>
                </Space>
              </a>
            </Dropdown>
          </div>
          {/* post content */}
          <div className="post-content mt-3">
            {/* content */}
            <div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
                fuga incidunt consequatur tenetur doloremque officia corrupti
                provident tempore vitae labore?
              </p>
              <img
                src="https://source.unsplash.com/random/12"
                alt="post image"
                className="post-content-image"
              />
            </div>
            {/* likes & comments */}
            <div className="post__comment">
              {/* likes */}
              <div
                className="number-like-comment"
                style={{ height: 50, zIndex: 5 }}
              >
                <div className="like-post">
                  <div className="me-2">
                    <img src={likeicon} alt="like" />
                    <img src={loveicon} alt="love" />
                    <img
                      className="x1b0d499 xl1xv1r"
                      src="https://www.facebook.com/reaction/image/115940658764963/?size=20&amp;scale=1.5"
                      alt=""
                      style={{
                        height: "18px",
                        width: "18px",
                        margin: "0 4px 0 2px",
                      }}
                    />
                    <img
                      alt="dear"
                      height="18"
                      src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 180 180' %3e %3cdefs%3e %3cradialGradient cx='50.001%25' cy='50%25' fx='50.001%25' fy='50%25' r='50%25' id='c'%3e %3cstop stop-color='%23F08423' stop-opacity='0' offset='0%25'/%3e %3cstop stop-color='%23F08423' stop-opacity='.34' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='50%25' cy='44.086%25' fx='50%25' fy='44.086%25' r='57.412%25' gradientTransform='matrix(-1 0 0 -.83877 1 .81)' id='d'%3e %3cstop stop-color='%23FFE874' offset='0%25'/%3e %3cstop stop-color='%23FFE368' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='10.82%25' cy='52.019%25' fx='10.82%25' fy='52.019%25' r='10.077%25' gradientTransform='matrix(.91249 .4091 -.31644 .7058 .174 .109)' id='e'%3e %3cstop stop-color='%23F28A2D' stop-opacity='.5' offset='0%25'/%3e %3cstop stop-color='%23F28A2D' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='74.131%25' cy='76.545%25' fx='74.131%25' fy='76.545%25' r='28.284%25' gradientTransform='rotate(-38.243 1.4 .537) scale(1 .40312)' id='f'%3e %3cstop stop-color='%23F28A2D' stop-opacity='.5' offset='0%25'/%3e %3cstop stop-color='%23F28A2D' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='31.849%25' cy='12.675%25' fx='31.849%25' fy='12.675%25' r='10.743%25' gradientTransform='matrix(.98371 -.17976 .03575 .19562 0 .16)' id='g'%3e %3cstop stop-color='%23D45F00' stop-opacity='.25' offset='0%25'/%3e %3cstop stop-color='%23D45F00' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='68.023%25' cy='12.637%25' fx='68.023%25' fy='12.637%25' r='12.093%25' gradientTransform='rotate(11.848 .192 .076) scale(1 .19886)' id='h'%3e %3cstop stop-color='%23D45F00' stop-opacity='.25' offset='0%25'/%3e %3cstop stop-color='%23D45F00' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='50.709%25' cy='66.964%25' fx='50.709%25' fy='66.964%25' r='87.22%25' gradientTransform='matrix(0 -.8825 1 0 -.163 1.117)' id='j'%3e %3cstop stop-color='%233B446B' offset='0%25'/%3e %3cstop stop-color='%23202340' offset='68.84%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='49.239%25' cy='66.964%25' fx='49.239%25' fy='66.964%25' r='87.22%25' gradientTransform='matrix(0 -.8825 1 0 -.177 1.104)' id='k'%3e %3cstop stop-color='%233B446B' offset='0%25'/%3e %3cstop stop-color='%23202340' offset='68.84%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='48.317%25' cy='42.726%25' fx='48.317%25' fy='42.726%25' r='29.766%25' gradientTransform='matrix(-.09519 -.96847 1.71516 -1.15488 -.204 1.389)' id='l'%3e %3cstop stop-color='%23E38200' offset='0%25'/%3e %3cstop stop-color='%23CD6700' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='50%25' cy='29.807%25' fx='50%25' fy='29.807%25' r='31.377%25' gradientTransform='matrix(.07236 -.9819 2.22613 1.12405 -.2 .454)' id='m'%3e %3cstop stop-color='%23E38200' offset='0%25'/%3e %3cstop stop-color='%23CD6700' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='73.646%25' cy='44.274%25' fx='73.646%25' fy='44.274%25' r='29.002%25' gradientTransform='scale(.92955 1) rotate(20.36 .764 .598)' id='p'%3e %3cstop stop-color='%23FF7091' stop-opacity='.7' offset='0%25'/%3e %3cstop stop-color='%23FE6D8E' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='26.749%25' cy='29.688%25' fx='26.749%25' fy='29.688%25' r='29.002%25' gradientTransform='scale(.92955 1) rotate(20.36 .278 .353)' id='q'%3e %3cstop stop-color='%23FF7091' stop-opacity='.7' offset='0%25'/%3e %3cstop stop-color='%23FE6D8E' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='23.798%25' cy='53.35%25' fx='23.798%25' fy='53.35%25' r='24.89%25' gradientTransform='matrix(-.18738 .97947 -1.25372 -.27758 .951 .449)' id='r'%3e %3cstop stop-color='%239C0600' stop-opacity='.999' offset='0%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='.94' offset='26.692%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='97.063%25' cy='54.555%25' fx='97.063%25' fy='54.555%25' r='15.021%25' gradientTransform='matrix(.8002 .50886 -.59365 1.08039 .518 -.538)' id='s'%3e %3cstop stop-color='%23C71C08' stop-opacity='.75' offset='0%25'/%3e %3cstop stop-color='%23C71C08' stop-opacity='.704' offset='53.056%25'/%3e %3cstop stop-color='%23C71C08' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='4.056%25' cy='24.23%25' fx='4.056%25' fy='24.23%25' r='13.05%25' gradientTransform='matrix(.8728 -.3441 .41218 1.20997 -.095 -.037)' id='t'%3e %3cstop stop-color='%239C0600' stop-opacity='.5' offset='0%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='.473' offset='31.614%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='74.586%25' cy='77.013%25' fx='74.586%25' fy='77.013%25' r='17.563%25' gradientTransform='matrix(.77041 .55955 -.56333 .89765 .605 -.339)' id='u'%3e %3cstop stop-color='%239C0600' stop-opacity='.999' offset='0%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='.934' offset='45.7%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='.803' offset='59.211%25'/%3e %3cstop stop-color='%239C0600' stop-opacity='0' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='50.001%25' cy='50%25' fx='50.001%25' fy='50%25' r='51.087%25' gradientTransform='matrix(-.3809 .91219 -.97139 -.46943 1.176 .279)' id='v'%3e %3cstop stop-color='%23C71C08' stop-opacity='0' offset='0%25'/%3e %3cstop stop-color='%23C71C08' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='2.243%25' cy='4.089%25' fx='2.243%25' fy='4.089%25' r='122.873%25' gradientTransform='scale(.78523 1) rotate(36.406 .025 .05)' id='x'%3e %3cstop stop-color='%23EDA83A' offset='0%25'/%3e %3cstop stop-color='%23FFDC5E' offset='100%25'/%3e %3c/radialGradient%3e %3cradialGradient cx='100%25' cy='7.011%25' fx='100%25' fy='7.011%25' r='105.039%25' gradientTransform='scale(-.90713 -1) rotate(-45.799 -.217 2.489)' id='z'%3e %3cstop stop-color='%23F4B248' offset='0%25'/%3e %3cstop stop-color='%23FFDD5F' offset='100%25'/%3e %3c/radialGradient%3e %3clinearGradient x1='50%25' y1='95.035%25' x2='50%25' y2='7.417%25' id='b'%3e %3cstop stop-color='%23F28A2D' offset='0%25'/%3e %3cstop stop-color='%23FDE86F' offset='100%25'/%3e %3c/linearGradient%3e %3clinearGradient x1='49.985%25' y1='-40.061%25' x2='49.985%25' y2='111.909%25' id='i'%3e %3cstop stop-color='%23482314' offset='0%25'/%3e %3cstop stop-color='%239A4111' offset='100%25'/%3e %3c/linearGradient%3e %3clinearGradient x1='52.727%25' y1='31.334%25' x2='28.964%25' y2='102.251%25' id='o'%3e %3cstop stop-color='%23F34462' offset='0%25'/%3e %3cstop stop-color='%23CC0820' offset='100%25'/%3e %3c/linearGradient%3e %3cpath d='M180 90c0 49.71-40.29 90-90 90S0 139.71 0 90 40.29 0 90 0s90 40.29 90 90z' id='a'/%3e %3cpath d='M108.947 95.828c-23.47-7.285-31.71 8.844-31.71 8.844s2.376-17.954-21.095-25.24c-22.57-7.004-36.253 13.757-37.307 26.812-2.264 28.103 22.134 59.996 31.26 70.86a8.062 8.062 0 008.34 2.584c13.697-3.777 51.904-16.242 66.009-40.667 6.54-11.328 7.06-36.188-15.497-43.193z' id='n'/%3e %3cpath d='M180.642 90c0 49.71-40.289 90-90 90-49.71 0-90-40.29-90-90s40.29-90 90-90c49.711 0 90 40.29 90 90z' id='w'/%3e %3c/defs%3e %3cg fill='none' fill-rule='evenodd'%3e %3cg fill-rule='nonzero'%3e %3cg transform='translate(.005 -.004)'%3e %3cuse fill='url(%23b)' xlink:href='%23a'/%3e %3cuse fill='url(%23c)' xlink:href='%23a'/%3e %3cuse fill='url(%23d)' xlink:href='%23a'/%3e %3cuse fill='url(%23e)' xlink:href='%23a'/%3e %3cuse fill='url(%23f)' xlink:href='%23a'/%3e %3cuse fill='url(%23g)' xlink:href='%23a'/%3e %3cuse fill='url(%23h)' xlink:href='%23a'/%3e %3c/g%3e %3cpath d='M109.013 66.234c-1.14-3.051-36.872-3.051-38.011 0-1.322 3.558 6.806 8.396 19.012 8.255 12.192.14 20.306-4.71 18.999-8.255z' fill='url(%23i)' transform='translate(.005 -.004)'/%3e %3cpath d='M68.006 46.125c.014 7.566-4.823 9.788-11.995 10.702-7.102 1.068-11.883-2.068-11.995-10.702-.099-7.256 3.81-16.116 11.995-16.284 8.17.168 11.981 9.028 11.995 16.284z' fill='url(%23j)' transform='translate(.005 -.004)'/%3e %3cpath d='M54.807 35.054c1.18 1.378.97 3.769-.479 5.358-1.448 1.575-3.571 1.744-4.753.366-1.181-1.378-.97-3.77.478-5.344 1.449-1.59 3.572-1.744 4.754-.38z' fill='%234E506A'/%3e %3cpath d='M112.022 46.125c-.014 7.566 4.823 9.788 11.995 10.702 7.102 1.068 11.883-2.068 11.995-10.702.099-7.256-3.81-16.116-11.995-16.284-8.184.168-11.995 9.028-11.995 16.284z' fill='url(%23k)' transform='translate(.005 -.004)'/%3e %3cpath d='M124.078 34.52c.957 1.547.38 3.881-1.293 5.217-1.674 1.336-3.797 1.181-4.753-.366-.957-1.546-.38-3.88 1.293-5.217 1.66-1.336 3.797-1.181 4.753.366z' fill='%234E506A'/%3e %3cpath d='M37.969 23.344c-2.349 1.983-.45 6.047 3.515 4.19 6.328-2.967 19.899-6.623 31.824-5.287 3.164.351 4.19-.113 3.487-4.022-.689-3.853-4.33-6.37-13.387-5.26-14.035 1.716-23.09 8.396-25.44 10.379z' fill='url(%23l)' transform='translate(.005 -.004)'/%3e %3cpath d='M116.592 12.952c-9.056-1.111-12.698 1.42-13.387 5.259-.703 3.91.323 4.373 3.487 4.022 11.925-1.336 25.481 2.32 31.824 5.287 3.965 1.857 5.864-2.207 3.515-4.19-2.348-1.97-11.404-8.649-25.439-10.378z' fill='url(%23m)' transform='translate(.005 -.004)'/%3e %3c/g%3e %3cg fill-rule='nonzero'%3e %3cuse fill='url(%23o)' xlink:href='%23n'/%3e %3cuse fill='url(%23p)' xlink:href='%23n'/%3e %3cuse fill='url(%23q)' xlink:href='%23n'/%3e %3cuse fill='url(%23r)' xlink:href='%23n'/%3e %3cuse fill='url(%23s)' xlink:href='%23n'/%3e %3cuse fill='url(%23t)' xlink:href='%23n'/%3e %3cuse fill='url(%23u)' xlink:href='%23n'/%3e %3cuse fill-opacity='.5' fill='url(%23v)' xlink:href='%23n'/%3e %3c/g%3e %3cg transform='translate(-.637 -.004)'%3e %3cmask id='y' fill='white'%3e %3cuse xlink:href='%23w'/%3e %3c/mask%3e %3cpath d='M15.52 86.231C9.642 80.508-.708 77.892-1.89 91.153c-.927 10.364 3.93 27.694 16.234 37.763C45.282 154.23 74.742 139.667 75.628 122c.699-13.932-15.502-12.327-20.648-12.045-.352.014-.507-.45-.197-.647a48.147 48.147 0 004.725-3.488c4.036-3.403 1.968-9.31-3.67-7.607-.858.253-14.583 4.359-23.288 1.068-9.872-3.726-11.053-7.214-17.03-13.05z' fill='url(%23x)' fill-rule='nonzero' mask='url(%23y)'/%3e %3cpath d='M161.081 88.2c3.502-6.778 9.066-4.401 12.194-3.359 4.61 1.537 7.353 4.4 7.353 11.572 0 17.001-2.812 32.765-17.002 48.6-25.987 28.982-69.935 25.143-73.675 6.862-3.094-15.16 13.066-16.678 18.34-17.381.365-.042.421-.605.098-.746a46.169 46.169 0 01-5.4-2.896c-5.444-3.403-3.989-10.051 2.405-9.07 6.806 1.012 15.23 2.924 22.486 2.207 21.009-2.11 24.975-19.87 33.201-35.789z' fill='url(%23z)' fill-rule='nonzero' mask='url(%23y)'/%3e %3c/g%3e %3c/g%3e %3c/svg%3e"
                      width="18"
                    />
                  </div>
                  <p className=""> &nbsp;Phu, Tuan, and 3 others</p>
                </div>
                <div className="comment-number">2 Comment</div>
              </div>
              {/* comments start*/}

              <div className="comment" id="accordionExample">
                <div className="comment-item">
                  {/* <Collapse
                    collapsible="header"
                    items={items_comments}
                    defaultActiveKey={["1"]}
                  /> */}

                  {/* comment collapse */}

                  <hr style={{ marginTop: "15px" }} />
                  {/* comment & like bar */}
                  <div className="comment-bar d-flex justify-content-around">
                    <div
                      className="
                      dropdown-item
                      
                      
                    "
                    >
                      <img src={iconlike} alt="like" />
                      <p> &nbsp; &nbsp;Like</p>
                    </div>
                    <div
                      className="
                      dropdown-item
                      
                    "
                    >
                      <img src={commenticon} alt="commenticon" />
                      <p onClick={handleClickComment}>&nbsp; &nbsp;Comment</p>
                    </div>
                    <div
                      className="
                      dropdown-item
                      
                    "
                    >
                      <img src={iconshare} alt="commenticon" />
                      <p onClick={handleClickComment}>&nbsp; &nbsp;Share</p>
                    </div>
                  </div>
                  {/* comment expand */}
                  <div className="comment-container">
                    <hr style={{ marginBottom: "15px" }} />
                    <div className="comment-body">
                      {/* comment 1 */}
                      <div className="commentitem my-1">
                        {/* avatar */}
                        <img
                          src="https://source.unsplash.com/collection/happy-people"
                          alt="avatar"
                          className="comment-image"
                          style={{
                            width: 38,
                            height: 38,
                            objectFit: "cover",
                          }}
                        />
                        {/* comment text */}
                        <div className="comment-text comment__input">
                          {/* comment menu of author */}
                          <div className="comment-author">
                            {/* icon */}
                            <Dropdown
                              menu={{
                                items,
                              }}
                              trigger={["click"]}
                              placement="bottomRight"
                            >
                              <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                  <svg
                                    type="button"
                                    id="post1Menu"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
                                  </svg>
                                </Space>
                              </a>
                            </Dropdown>
                          </div>
                          <p className="comment-author-name">John</p>
                          <p className="comment-des-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                        </div>
                      </div>
                      {/* comment 2 */}
                      <div className="commentitem">
                        {/* avatar */}
                        <img
                          src="https://source.unsplash.com/random/2"
                          alt="avatar"
                          className="comment-image"
                          style={{
                            width: 38,
                            height: 38,
                            objectFit: "cover",
                          }}
                        />
                        {/* comment text */}
                        <div className="comment-text comment__input">
                          <p className="comment-author-name">Jerry</p>
                          <p className="comment-des-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                        </div>
                      </div>
                      {/* create comment */}
                      <form className="comment-author-add">
                        {/* avatar */}
                        <div>
                          <img
                            src="https://source.unsplash.com/collection/happy-people"
                            alt="avatar"
                            className="comment-image"
                            style={{
                              width: 38,
                              height: 38,
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        {/* input */}
                        <input
                          type="text"
                          className="comment-input-add"
                          placeholder="Write a comment"
                        />
                      </form>
                      {/* end */}
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
