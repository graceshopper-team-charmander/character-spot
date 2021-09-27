import { expect } from "chai";
import {
  fetchProducts,
  setProducts,
  SET_PRODUCTS,
  SET_PRODUCTS_FETCH_STATUS
} from "../../../client/store/products";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../../../constants";

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  fetchStatus: FETCH_PENDING,
  products: []
};

describe("Redux: Product", () => {
  let productStore, mockAxios;
  const products = [
    {
      name: "KitKat",
      imageUrl: "/images/kitkat.jpg",
      price: 1.25,
      description: "Take a break!"
    },
    {
      name: "Butterfinger",
      imageUrl: "/images/butterfinger.jpg",
      price: 1.5,
      description: "Peanut Buttery"
    }
  ];

  beforeEach(() => {
    productStore = mockStore(initialState);
  });

  it("setProducts action creator returns a valid action", () => {
    expect(setProducts(products)).to.deep.equal({
      type: SET_PRODUCTS,
      products
    });
  });

  describe("fetchProducts action creator", () => {
    beforeEach(() => {
      mockAxios = new MockAdapter(axios);
    });
    it("returns a function", async () => {
      const thunk = await fetchProducts();
      expect(typeof thunk).to.be.equal("function");
    });
    it("dispatches pending -> success -> set products actions on success", async () => {
      mockAxios.onGet("/api/products").reply(200, products);
      await productStore.dispatch(fetchProducts());
      const actions = productStore.getActions();
      let pendingAction = false;
      let successAction = false;
      let setProductsAction = false;
      actions.forEach((action) => {
        if (action.type === SET_PRODUCTS_FETCH_STATUS && action.status === FETCH_PENDING) {
          pendingAction = action;
        } else if (action.type === SET_PRODUCTS_FETCH_STATUS && action.status === FETCH_SUCCESS) {
          successAction = action;
        } else if (action.type === SET_PRODUCTS && action.products) {
          setProductsAction = action;
        }
      });
      expect(typeof pendingAction).to.be.equal("object");
      expect(typeof successAction).to.be.equal("object");
      expect(typeof setProductsAction).to.be.equal("object");
      expect(setProductsAction.products).to.deep.equal(products);
    });
    it("dispatches fetch status failed on error", async () => {
      mockAxios.onGet("/api/products").reply(500, products);
      await productStore.dispatch(fetchProducts());
      const actions = productStore.getActions();
      let failedAction = false;
      actions.forEach((action) => {
        if (action.type === SET_PRODUCTS_FETCH_STATUS && action.status === FETCH_FAILED) {
          failedAction = action;
        }
      });
      expect(typeof failedAction).to.be.equal("object");
    });
  });
});
