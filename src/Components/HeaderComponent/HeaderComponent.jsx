import React from "react";
import { NavLink } from "react-router-dom";
import { changeIsOpen, changeIsOpenModal } from "../../Redux/navSlice";
import { removeFromCart } from "../../Redux/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/Logo.svg";
import kids from "../../assets/kids.png";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CloseButton,
  Col,
  Container,
  Row,
} from "reactstrap";
import {
  AiFillHome,
  AiFillInfoCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const HeaderComponent = (props) => {
  const isOpen = useSelector((state) => state.nav.isOpen);
  const isOpenModal = useSelector((state) => state.nav.isOpenModal);
  const cart = useSelector((state) => state.products.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(changeIsOpen(!isOpen));
  };
  const toggleModal = () => {
    dispatch(changeIsOpenModal(!isOpenModal));
  };
  const ListCart = () => {
    return cart.map((product, index) => {
      return (
        <>
          <Container key={index}>
            <Row>
              <Col xs="7">
                <h5>{product.Name}</h5>
              </Col>
              <Col xs="3">
                <h5>{product.Price}</h5>
              </Col>
              <Col xs="2">
                <CloseButton
                  sm={2}
                  onClick={() => dispatch(removeFromCart(product))}
                />
              </Col>
            </Row>
          </Container>
        </>
      );
    });
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += parseInt(product.Price);
    });
    return total;
  };

  const onBuy = () => {
    let total = calculateTotal();
    alert(`Total: ${total}`);
    toggleModal();
  };

  return (
    <React.Fragment>
      <Navbar dark expand="md">
        <img src={logo} alt="FunnyToy's Logo" className="img_logo" />
        <NavbarBrand className="Title" href="/">
          Funny Toys
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/home">
                <AiFillHome /> Inicio
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/aboutus">
                <AiFillInfoCircle /> Acerca de nosotros
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="navTwo" navbar>
            <NavItem>
              <Button
                className="cartShop"
                outline
                color="light"
                onClick={toggleModal}
              >
                <AiOutlineShoppingCart className="cartShopImg" />
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="jumbotron">
        <div className="container">
          <div className="row row-header">
            <div className="info_banner">
              <div className="text_banner">
                <h1>¡Brindamos felicidad!</h1>
                <p>
                  Buscamos ejercer un impacto positivo, beneficioso y especial en cada uno los niños; Porque no solo somos parte de la aventura y juegos,
                  sino también de su infancia brindamos en nuestros juguetes una ¡Excelente calidad!
                </p>
              </div>
              <img src={kids} alt="Kid's img" className="imgs" />
            </div>
          </div>
        </div>
      </div>
      <Modal ClassName="modalCartShop" isOpen={isOpenModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Carro de compras :</ModalHeader>
        <ModalBody>
          <ListCart />
          <Button onClick={() => onBuy()} className="btnCompra">
            Compra
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default HeaderComponent;
