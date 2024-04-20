import FormPopover from '@/components/form/form-popover';
import { HelpCircle, User2 } from 'lucide-react';

export default function BoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-500">
        <User2 className="h-6 w-6 mr-2" />
        Tus tableros
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Crear tablero</p>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}