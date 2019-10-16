class CreateCells < ActiveRecord::Migration[5.1]
  def change
    create_table :cells do |t|
      t.boolean :hasMine
      t.boolean :hasFlag
      t.boolean :isOpen
      t.string :position
      t.integer :count

      t.timestamps
    end
  end
end
