defmodule HeatTags.Tags.Count do
  alias HeatTags.Messages.Get

  def call do
    messages = Get.today_messages()

    Task.async_stream(messages, fn message ->
      message.messages
      |> String.split()
      |> Enum.frequencies()
    end)
  end
end
