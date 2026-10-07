# ピザ注文システム（pizza-order）

ピザの注文管理を行う。ピザは種類ごとに値段とトッピングを持つ。また、デフォルトトッピングがあり、注文追加時には自動で付与・変更不可とする。

## 画面

### メイン画面(MainPage)

- 注文一覧表示
- 各注文の詳細表示
  - ピザおよびトッピング
  - ピザの合計金額
- 各操作ボタン
  - 注文追加ボタン
  - 注文変更ボタン（追加仕様）
  - 取り消しボタン
  - 復元ボタン

![メイン画面](./public/MainPage.png)

### 注文追加モーダル(AddOrderModal)

- ピザ一覧（名称・価格）
- トッピング一覧（名称・価格）
  - 各ピザのデフォルトトッピングはチェック済みとし、変更不可・0円表示とする

![注文追加モーダル](./public/AddOrderModal.png)

## データ

注文は localStorage に保存する。

### マスターデータ（固定データ）

- Pizza
  - id
  - name
  - price
  - toppings:string[]（デフォルトトッピングのTopping id）
- Topping
  - id
  - name
  - price

### 注文データ（保存対象）

注文時点のピザ名・金額などを保持する（後からマスターが変わっても注文内容は変わらない）。トッピングは注文とは別に、`orderId` で紐づけて保持する。

- Order
  - id
  - pizzaId
  - pizzaName
  - pizzaPrice
  - totalPrice（ピザ料金 + 追加トッピング料金）
  - isCancel
  - createdAt
  - updatedAt
- OrderTopping
  - id
  - orderId
  - toppingId
  - toppingName
  - toppingPrice（デフォルトトッピングは0円）
  - createdAt
  - updatedAt

## 操作

- 注文追加(edit-order)
  - ピザとトッピングを選んで注文を登録する
- 注文変更(edit-order)
  - 選択中の注文のピザ・トッピングを変更する
- 注文取消(cancel-order)
  - 取消済みの注文は取消できない
- 注文復元(restore-order)
  - 取消されていない注文は復元できない

注文を選択していない間は、変更・取消・復元は押せない。
