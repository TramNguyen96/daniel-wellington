import React, { Component } from "react";
import Slider from "react-slick";

export default class Resizable extends Component {
  state = {
    display: true,
    width: 1600
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    const listCartCombo = [
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_1.png?alt=media&token=a419961f-ef59-4621-ac41-6b4a18e99732",
            name:"Petite 28 Evergold White + Classic Bracelet",
            price:'258'
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_2.png?alt=media&token=6c58c981-ab38-4823-96ae-4ca4624eded0",
            name:"Petite St Mawes + Classic Bracelet",
            price:'248'
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_3.png?alt=media&token=b7f058ac-0b26-44c5-8f2b-88e804d0f639",
            name:"Quadro Lumine Pressed Piano + Elan Unity Bracelet",
            price:'358'
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_4.png?alt=media&token=47d7aaa3-f2cc-4aa2-8f54-f5196100c06d",
            name:"Iconic Link Black + Classic Bracelet",
            price:'308'
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_5.png?alt=media&token=390dc733-0ed2-46bf-ba0e-c61672560004",
            name:"Petite Lumine 5-link two-tone + Classic Bracelet",
            price:'298'
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_6.png?alt=media&token=a44fc985-3c48-4d4e-8344-3c8bfd0f1b4d",
            name:"Quadro Lumine Pressed Piano + Elan Unity Bracelet",
            price:'358'
        },
        {
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartCombo%2Fcart_combo_7.png?alt=media&token=4ad0487a-1ced-4c1d-8f0d-7f1c9b463aa2",
            name:"Quadro Pressed Melrose Black + Classic Bracelet",
            price:'298'
        }
    ]
    return (
      <div className="cartCombo">
        <h2> BROWSE THROUGH OUR MOST POPULAR COMBINATIONS</h2>
        <button
          className="button"
          onClick={() =>
            this.setState({
              width: this.state.width + 100
            })
          }
        >
     
        </button>
        <button
          className="button"
          onClick={() =>
            this.setState({
              width: this.state.width - 100
            })
          }
        >
      
        </button>
        <button
          className="button"
          onClick={() =>
            this.setState({
              display: !this.state.display
            })
          }
        >
         
        </button>
        <div
          style={{
            width: this.state.width + "px",
            display: this.state.display ? "block" : "none"
          }}
        >
          <Slider {...settings}>
            {listCartCombo.map((item)=>(
                <div>
                    <img src={item.img} alt="" style={{width:'350px', height:'350px'}} />
                    <p style={{marginRight:'130px'}}>{item.name}</p>
                    <p style={{marginRight:'130px'}}>${item.price}</p>
                    <button type="button" class="btn btn-outline-danger" style={{marginRight:'130px'}} >Add To Cart</button>
                </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}