interface ClothingItem {
    category: string;
    style: string;
    pattern: string;
    material: string;
    fit: string;
    length: string;
    neckline: string;
    sleeveLength: string;
    brand: string;
    colors: string[];
    seasons: string[];
    occasions: string[];
}

interface DropdownModalProps {
    visible: boolean;
    onClose: () => void;
    options: string[];
    onSelect: (option: string) => void;
    selectedValue: string;
}

export type { ClothingItem, DropdownModalProps };