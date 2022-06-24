import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addToCart,
  filterProducts,
  cleanFilter,
} from "../../Redux/productsSlice";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { homeSlice } from "../../Redux/homeSlice";

const RenderProductItem = ({ product, onClick }) => {
  return (
    <Card body className="container_card">
      <CardTitle className="container_cardTitle" tag="h5">{product.Name}</CardTitle>
      <CardText className="container_cardText">{product.Price}</CardText>
      <Button onClick={() => onClick()}>Agregar al carrito</Button>
    </Card>
  );
};

const HomeComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const isOpen = useSelector((state) => state.home.isOpen);
  const productListFiltered = useSelector(
    (state) => state.products.productListFiltered
  );
  console.log(productListFiltered);
  const toggle = () => {
    dispatch(homeSlice.actions.changeIsOpen(!isOpen));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const add = (product) => {
    dispatch(addToCart(product));
  };

  const filterProductsList = (filter) => {
    dispatch(filterProducts(filter));
  };

  //Funcion para el listado de productos
  const RenderProducts = () => {
    if (productListFiltered !== null) {
      return productListFiltered.map((product, index) => {
        return (
          <div key={product.Id} className="col-6">
            <RenderProductItem product={product} onClick={() => add(product)} />
          </div>
        );
      });
    } else {
      return products.map((product) => {
        return (
          <div key={product.Id} className="col-6">
            <RenderProductItem product={product} onClick={() => add(product)} />
          </div>
        );
      });
    }
  };

  //Condicion pag - cargando productos
  if (loading) {
    return <p className="pLoader">Cargando...</p>;
  } else if (error) {
    return <p className="pLoader">Error</p>;
  } else {
    return (
      <div className="container">
        <br/>
        <div className="containerTwo">
          <p className="pText">Si desea buscar una categoria de muñecas en específico, Por favor seleccione una de las categorias disponibles para filtrar los productos: </p>
          <ButtonDropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle caret>Categorias</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => filterProductsList("Barbie")}>
                Barbie
              </DropdownItem>
              <DropdownItem onClick={() => filterProductsList("Lol")}>
                Lol
              </DropdownItem>
              <DropdownItem onClick={() => dispatch(cleanFilter())}>
                Todos
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <div className="row">
          <RenderProducts />
        </div>
      </div>
    );
  }
};
export default HomeComponent;
