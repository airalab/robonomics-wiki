---
title: Gaka-Chuのセットアップとソフトウェアのインストール

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**この記事では、ロボットペインターをセットアップするためのインストールと起動手順について説明します。必要なもの:**
- KUKA KR6 R900 sixxとKRC4およびSmartPad;
- [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu)がインストールされたIntel NUC;
- テーブル、ペイント、ブラシ、水。

## KRC4へのソフトウェアのインストール
EKIインターフェースは、KRC4とNUCの両方で必要です。KRC4に設定する方法の詳細は[こちら](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl)に記載されています。ロボットのコントローラーで起動してください。

## NUCへのソフトウェアのインストール
Catkinワークスペースを作成します:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
ROSパッケージをダウンロードします。すべてのスクリプトは[こちら](https://github.com/airalab/robot_painter/tree/test_branch)に保存されています。リポジトリをクローンします:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
すべてが正しく動作するために、いくつかのヘッダーファイルとライブラリが必要になる場合があります。それらをダウンロードします:
```
cd ~
git clone https://github.com/PaTara43/kuka_moveit_webots
cd kuka_moveit_webots
sudo mv -r headers/* usr/include/c++/7/
sudo mv libs/* usr/local/lib/
cd ~
svn checkout https://github.com/PX4/Matrix/trunk/matrix
mv matrix -r /usr/include/c++/7/
sudo apt-get install ros-melodic-brics-actuator
cd ~/catkin_ws
catkin build
```
`.bashrc`ファイルにソースコマンドを追加します:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
これで、スクリプトを起動できるはずです。. 何か問題が発生した場合は、[トラブルシューティング](https://github.com/airalab/robot_painter/issues)を試してみてください

## 定数の入力
まず最初に、ロボットはキャンバスの位置と向き、およびペイント缶の位置を知る必要があります。これらすべては `fake_painter_enviroment_tf/src/tf_broadcaster.cpp` で指定されています。中身を見てみましょう。
```
// 平面の定数
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// キャンバスの変換
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
これらは、3次元空間でキャンバスの位置を指定する平面方程式の定数です。以下で説明するキャリブレーションプロセス中に取得する必要があります。次に、ペイントが続きます。
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
これらはペイント缶の座標です。これらもキャリブレーション中に指定することができます。キャンバスのサイズは以下で指定されています。
```
canvas.width = 0.5;
canvas.height = 0.4;
```
さらにいくつかの重要な定数が `local_task_planner/src/Drawing.cpp` に保存されています。
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
その名前がすべてを物語っていますので、状況に応じて入力してください。

## Gaka-Chuのキャリブレーション
キャリブレーションプロセス自体は非常に簡単です。

1) KRC4でEKIインターフェースを起動します：

「AUT」モードでログインし、ドライバーをオンにして、スクリプト `eki_hw_interface` を起動します

2) NUCでEKIインターフェースを起動します
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
無限のログが出力されるはずです。

3) RVizを起動します
```
roslaunch rviz rviz
```slaunch kuka_moveit_config demo.launch
```
以下が表示されるはずです：

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

エンドエフェクタを動かして「Plan and Execute」をクリックしてみてください。ロボットが動くはずです。SmartPadで**Display -> Actual position**に移動し、エンドエフェクタの座標を観察します。キャンバスをロボットベースに水平に配置します。ブラシをブラシホルダーに差し込み、慎重に動かしてキャンバスにほんのり触れるまで移動します。この位置でエンドエフェクタの座標を保存します。12〜15回繰り返します。また、キャンバスの中心とペイント缶の座標も保存します。
座標セットができたら、[こちら](https://github.com/nakata5321/Matlab_scripts_gaka-chu)のMatlabスクリプトを使用して、欠損している定数と四元数を解決します。それらを貼り付けます。次のコマンドを使用してワークスペースを再構築します。
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Gaka-Chuのキャリブレーションのテスト
キャリブレーションが完了したら、Gaka-Chuをキャンバスの境界線を描くようにテストする必要があります。以下を新しいターミナルでそれぞれ実行してください：
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
これにより、RVizにキャンバスの輪郭が表示されます：

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

ターミナルで「S」を押してテストを実行します。ロボットのエンドエフェクタはキャンバスの境界線のすぐ上に移動し、ブラシは移動中ずっとキャンバスに優しく触れるはずです。そうでない場合は、再キャリブレーションを試してください。キャンバスモデルが間違って回転している場合は、Matlabで四元数を変更して回転させることができます。

## アート作成
すべてが機能するようにするには、6つの基本モジュールが必要です：
- EKIインターフェース；
- MOVEit + RViz；
- 環境フレームのブロードキャスト；
- 画像変換サービス；
- 軌道描画モジュール；
- 開始トリガー。

それらを1つずつ起動しましょう。

### Ekiインターフェース
KRC4で`eki_hw_interface`を起動し、N新しい端末でUCを実行してください：
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RVizとMOVEit
プランナーとシミュレーションが必要です。次のコマンドで起動してください：
```
roslaunch kuka_moveit_config demo.launch
```

### 環境
ロボットにペイント缶とキャンバスの位置を教えてください。`draw workspace`ノードを起動する必要はありませんが、`tf_broadcaster`がキャンバスのサイズを共有します。ただし、RVizには表示されません。
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### 画像処理
すべての入力画像は処理する必要があります。サービスを起動してください。
```
rosrun picture_preprocessing TextConverter.py
```
呼び出しを受けると、HPフィルターで画像を処理し、軌跡付きのrosbagファイルを作成します。

### 軌跡描画
ここで最も重要なスクリプトは軌跡描画です。画像を待ち、TextConverterサービスを呼び出して絵を描きます。
```
rosrun local_task_planner trajectory_drawing
```

## ロボットに描く画像を送信
ロボットは特定のROSトピックをリッスンし、所望の画像へのパスを渡す必要があります。画像は正方形である必要があり、線で構成されている必要があります。パスを送信してください：
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
その後、輪郭とトラックが表示される2つのウィンドウが表示されます。それらを閉じて、Gaka-Chuが描画を行うのを見てください。安全に気を付け、常に緊急停止ボタンを押す準備をしてください。
Gaka-Chuがアートを完成させたら、別の画像へのパスを送信して、ペインターが全プロセスを繰り返します。