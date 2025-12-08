<?php

namespace App\Http\Controllers\admin;
use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class Order_controller extends Controller
{
    // ll_orders
    public function all_orders(){
        $orders = Order::all();
        return Inertia::render("admin/orders/index",["orders"=>$orders]);
    }


    // daily_orders
    public function daily_orders(Request $request){     
        return Inertia::render('admin/orders/dialy',);
     
    }


    public function fetch_daily_orders(){
        $orders = Order::whereDate('created_at', Carbon::today())->whereIn('status', [0, 1])->get();
        return response()->json($orders);
    }



    public function get_last_order(){
        $order = Order::latest()->first();
        return response()->json($order);
    }


    // change_order_status_to_preparing
    public function change_order_status_to_preparing($id){
        $order = Order::findOrFail($id);
        $order->status = 1;
        $order->save();
        return redirect()->back();
    }
    // change_order_status_to_done
    public function change_order_status_to_done($id){
        $order = Order::findOrFail($id);
        $order->status = 2;
        $order->save();
        return redirect()->back();
    }
}
