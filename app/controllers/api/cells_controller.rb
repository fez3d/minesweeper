require 'json'

class Api::CellsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update_all
    cells = Cell.all
    cells.each_with_index do |cell, index|
      cell.hasFlag = params[:cell][index][:hasFlag]
      cell.isOpen = params[:cell][index][:isOpen]
      cell.hasMine = params[:cell][index][:hasMine]
      cell.count = params[:cell][index][:count]
      cell.save
    end
  end

  def update_one
    cell = Cell.find_by(position: params[:position])
    cell.update(cell_params)
  end

  def load
    cells = Cell.all
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
    render json: json
  end

  def create
  end

  private

  def cell_params
    #params.require(:cell).permit(:count, :hasFlag, :hasMine, :isOpen, :id, :position, :board)
    params.require(:cell).permit!
  end
end