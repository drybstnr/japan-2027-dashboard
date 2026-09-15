import { Plus } from 'lucide-react';
export function FloatingAddButton({ onClick }: { onClick: () => void }) { return <button type="button" className="floating-add" aria-label="Add plan" onClick={onClick}><Plus size={21} /><span>Add plan</span></button>; }
