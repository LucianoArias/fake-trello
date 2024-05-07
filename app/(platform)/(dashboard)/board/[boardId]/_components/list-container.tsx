'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { ListWithCards } from '@/types';
import ListForm from './list-form';
import { useEffect, useState } from 'react';
import ListItem from './list-item';
import { useAction } from '@/hooks/use-action';
import { updateListOrder } from '@/actions/update-list-order';
import { toast } from 'sonner';
import { updateCardOrder } from '@/actions/update-card-order';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function ListContainer({ data, boardId }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('Lista reordenada');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('Tarjeta reordenada');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // Si cae en la misma posición
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Si el usuario mueve una lista
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        order: index,
      }));

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    // Si el usuario mueve una tarjeta
    if (type === 'card') {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find((list) => list.id === source.droppableId);
      const destList = newOrderedData.find((list) => list.id === destination.droppableId);

      if (!sourceList || !destList) {
        return;
      }

      // Comprueba si existen tarjetas en sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Comprueba si existen tarjetas en destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Si el usuario mueve tarjetas en la misma lista
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index);

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });

        // Si el usuario mueve tarjetas en otra lista
      } else {
        // Se elimina la tarjeta de sourceList
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Se asigna el nuevo listId a la tarjeta movida
        movedCard.listId = destination.droppableId;

        // Agregar tarjeta a destList
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Se ctualiza el pedido de cada tarjeta en destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
