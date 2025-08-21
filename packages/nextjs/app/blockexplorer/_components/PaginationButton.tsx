import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";

type PaginationButtonProps = {
  currentPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
};

const ITEMS_PER_PAGE = 20;

export const PaginationButton = ({ currentPage, totalItems, setCurrentPage }: PaginationButtonProps) => {
  const isPrevButtonDisabled = currentPage === 0;
  const isNextButtonDisabled = currentPage + 1 >= Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (isNextButtonDisabled && isPrevButtonDisabled) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={isPrevButtonDisabled}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Previous
      </Button>

      <span className="text-sm font-medium text-muted-foreground">
        Page {currentPage + 1} of {Math.ceil(totalItems / ITEMS_PER_PAGE)}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={isNextButtonDisabled}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="gap-2"
      >
        Next
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
