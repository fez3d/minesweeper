class Cell < ApplicationRecord

  def self.update_board cells
    cells.each_with_index do |cell, index|
      cell.hasFlag = params[:cell][index][:hasFlag]
      cell.isOpen = params[:cell][index][:isOpen]
      cell.hasMine = params[:cell][index][:hasMine]
      cell.count = params[:cell][index][:count]
      cell.save
    end
  end

  def self.load_game cells 
    json = "{"
    part = ""
    cells.each_with_index do |cell, index|
      if index == 255
        part = "\"#{cell.position}\": {\"hasMine\": #{cell.hasMine}, \"hasFlag\": #{cell.hasFlag}, \"isOpen\": #{cell.isOpen}, \"count\": #{cell.count}, \"position\": \"#{cell.position}\"}"
      else
        part = "\"#{cell.position}\": {\"hasMine\": #{cell.hasMine}, \"hasFlag\": #{cell.hasFlag}, \"isOpen\": #{cell.isOpen}, \"count\": #{cell.count}, \"position\": \"#{cell.position}\"}, "
      end 
      json = json + part
    end
    json = json + "}"
  end
end
