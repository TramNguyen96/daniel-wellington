import React from "react";
import "./Banner.scss";
import Carousel from "react-bootstrap/Carousel";
import { CodepenOutlined } from "@ant-design/icons";
import { DropboxOutlined } from "@ant-design/icons";
import { HistoryOutlined } from "@ant-design/icons";

export default function Banner() {
    const listCarousel = [
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fcarousel%2Fcarousel_1.jpg?alt=media&token=317183a8-9ca7-4091-b1f5-3fbe4175b008",
            title: "DW Watch 1",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fcarousel%2Fcarousel_2.jpg?alt=media&token=a5bfc8bc-842a-4901-a07e-e2e92a69ea5b",
            title: "DW Watch 2",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fcarousel%2Fcarousel_3.jpg?alt=media&token=2ee6a842-54a4-4f67-80ae-08bdf5956651",
            title: "DW Watch 3",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fcarousel%2Fcarousel_4.jpg?alt=media&token=ad582c3a-2549-4735-a343-f1b110b2b558",
            title: "DW Watch 4",
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fcarousel%2Fcarousel_5.jpg?alt=media&token=bad1f1b8-f4c1-4394-ae84-f335263dc557",
            title: "DW Watch 5",
        },
    ];
    return (
        <div>
            <Carousel>
                {listCarousel.map((item) => (
                    <Carousel.Item Interval={300}>
                        <img
                            className="d-block w-100"
                            src={item.img}
                            alt={item.title}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="supportInfor">
                <div>
                    <CodepenOutlined />
                    <p>Free Shipping</p>
                </div>
                <div>
                    <DropboxOutlined />
                    <p>Free Return</p>
                </div>
                <div>
                    <HistoryOutlined />
                    <p>2 years Warranty</p>
                </div>
            </div>
        </div>
    );
}
