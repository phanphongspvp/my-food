import Home from "~/pages/Home";
import Noodle from "~/pages/Noodle";
import Soup from "~/pages/Soup";
import Porridge from "~/pages/Porridge";
import MilkTea from "~/pages/MilkTea";
import Juice from "~/pages/Juice";
import Coffee from "~/pages/Coffee";
import FoodDeals from "~/pages/FoodDeals";
import CollectionList from "~/pages/CollectionList";

const publicRoutes = [
  {
    path: "/coffee/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "coffees",
  },
  {
    path: "/juice/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "juices",
  },
  {
    path: "/milktea/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "milkteas",
  },
  {
    path: "/porridge/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "porridges",
  },
  {
    path: "/soup/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "soups",
  },
  {
    path: "/noodle/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "noodles",
  },
  {
    path: "/ha-noi/food/deals",
    component: FoodDeals,
    layout: "headerOnly",
    data: "rices",
  },
  {
    path: "/ha-noi/food/collection-list",
    component: CollectionList,
    layout: "headerOnly",
  },
  { path: "/noodle", component: Noodle },
  { path: "/soup", component: Soup },
  { path: "/porridge", component: Porridge },
  { path: "/milktea", component: MilkTea },
  { path: "/juice", component: Juice },
  { path: "/coffee", component: Coffee },
  // { path: "/pets", component: Pets, layout: null },
  { path: "/", component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
