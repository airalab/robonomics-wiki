---
title: Gaka-Chuのセットアップとソフトウェアのインストール

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**この記事では、ロボットペインターのセットアップのためのインストールと起動手順について説明します。要件:**
- KUKA KR6 R900 sixxとKRC4およびSmartPad;
- [ROS melodic](http://wiki.ros.org/melodic/インストールation/Ubuntu)がインストールされたIntel NUC;
- テーブル、絵の具、筆、水。

## KRC4へのソフトウェアのインストール
KRC4とNUCの両方にEKIインターフェースが必要です。KRC4での設定方法の詳細は[こちら](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl)に示されています。ロボットのコントローラーで起動してください。

## NUCへのソフトウェアのインストール
catkinワークスペースを作成してください。
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
ROSパッケージをダウンロードしてください。すべてのスクリプトは[ここ](https://github.com/airalab/robot_painter/tree/test_branch)に保存されています。リポジトリをクローンしてください。
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
すべてが正しく動作するために、いくつかのヘッダーファイルとライブラリが必要になる場合があります。それらをダウンロードしてください。
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
`.bashrc`ファイルにソースコマンドを追加してください。
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
これで、スクリプトを起動できるはずです。何か問題が発生した場合は、[トラブルシューティング](https://github.com/airalab/robot_painter/issues)を試してください。

## 定数の入力
ま、ロボットはキャンバスの位置と向き、および絵の具の位置を知る必要があります。これらはすべて`fake_painter_enviroment_tf/src/tf_broadcaster.cpp`で指定されています。詳細を見てみましょう。
```
// Plane constants
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// Canvas transform
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
これらは3D空間でキャンバスの位置を指定する平面方程式の定数です。次に絵の具があります。
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
これらは絵の具の座標です。これらもキャリブレーション時に指定することができます。キャンバスのサイズは次のように指定されます
```
canvas.width = 0.5;
canvas.height = 0.4;
```
その他の重要な定数は`local_task_planner/src/Drawing.cpp`に保存されています。
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
その名前からもわかるように、状況に応じてそれらを入力してください。

## Gaka-Chuのキャリブレーション
キャリブレーションプロセス自体は非常にシンプルです。

1) KRC4でEKIインターフェースを起動します。

'AUT'モードでログインし、ドライバをオンにし、スクリプト`eki_hw_interface`を起動します。

2) NUCでEKIインターフェースを起動します
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
無限のログが出力されるはずです。

3) RVizを起動します
```
roslaunch kuka_moveit_config demo.launch
```
次のように表示されるはずです。

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

エンドエフェクタを動かして「Plan and Execute」をクリックしてみてください。ロボットが動くはずです。SmartPadで**Display -> Actual position**に移動し、エンドエフェクタの座標を確認します。キャンバスをロボットのベースに水平に配置します。ブラシをブラシホルダーに差し込み、キャンバスにかろうじて触れるまで注意深く移動します。この位置でエンドエフェクタの座標を保存します。12〜15回繰り返します。また、キャンバスの中心と絵の具の座標も保存します。
座標が揃ったら、[こちら](https://github.com/nakata5321/Matlab_scripts_gaka-chu)のMatlabスクリプトを使用して、不足している定数とクォータニオンを解決します。それらを貼り付けます。
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Gaka-Chuのキャリブレーションのテスト
キャリブレーションが完了したら、Gaka-Chuをテストする必要があります。キャンバスの境界線を描くために次のコマンドを新しいターミナルで実行してください。
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
これで、RVizにキャンバスの輪郭が表示されるはずです。

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

ターミナルで「S」を押してテストを実行します。ロボットのエンドエフェクタはキャンバスの境界線のすぐ上に移動し、ブラシは移動中ずっとキャンバスに優しく触れるはずです。そうでない場合は、再キャリブレーションを試してください。キャンバスモデルが誤って回転している場合は、Matlabでクォータニオンを変更して回転させることができます。

## アート作成
すべてが正常に動作するには、6つの基本モジュールが必要です。
- EKIインターフェース;
- MOVEit + RViz;
- 環境フレームのブロードキャスト;
- 画像変換サービス;
- 軌跡描画モジュール;
- 起動トリガー。

それぞれを順番に起動しましょう。

### EKIインターフェース
KRC4で`eki_hw_interface`を起動し、NUCでは新しいターミナルで次のコマンドを実行してください。
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RVizとMOVEit
プランナーとシミュレーションが必要です。次のコマンドで起動してください。
```
roslaunch kuka_moveit_config demo.launch
```

### 環境
ロボットに絵の具缶とキャンバスの位置を伝えます。`draw workspace`ノードを起動する必要はありませんが、`tf_broadcaster`はキャンバスのサイズを共有します。ただし、RVizには表示されません。
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### 画像処理
すべての入力画像を処理する必要があります。サービスを起動してください。
```
rosrun picture_preprocessing TextConverter.py
```
通話を受けると、HPフィルターで画像を処理し、軌跡を持つrosbagファイルを作成します。

### 軌跡描画
ここで最も重要なスクリプトは、軌跡描画自体です。画像を待ち、TextConverterサービスを呼び出して絵を描きます。
```
rosrun local_task_planner trajectory_drawing
```

## ロボットに描画するための画像を送信してください
ロボットは特定のROSトピックをリッスンし、所望の画像のパスを渡す必要があります。画像は正方形で（幅と高さが等しい）線で構成されている必要があります。パスを送信してください：
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
その後、輪郭とトラックが表示される2つのウィンドウが表示されます。それらを閉じて、Gaka-Chuの描画を見てください。安全に注意し、常に緊急停止ボタンを押す準備をしてください。
Gaka-Chuがアートを終えたら、別のパスを画像に送信し、画家が全体のプロセスを繰り返します。
