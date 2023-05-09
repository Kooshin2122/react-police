import { combineReducers } from "@reduxjs/toolkit";
import common from "../reducer/CommonReducer";
import user from "../reducer/UserReducer";

import Dashboard from "../reducer/DashboardReducer";

import FleetDetails from "../reducer/FleetDetailsReducer";

import Penality from "../reducer/PenalityReducer";

import Payment from "../reducer/PaymentReducer";

import BarCodeScanner from "../reducer/BarCodeScannerReducer";

import Reason from "../reducer/ReasonReducer";

import Track from "../reducer/TrackReducer";

import ChargePayment from "../reducer/ChargePaymentReducer";

const rootReducer = combineReducers({
  common,
  user,
  Dashboard,
  FleetDetails,
  Penality,
  Payment,
  BarCodeScanner,
  Reason,
  Track,
  ChargePayment,
});

export default rootReducer;
