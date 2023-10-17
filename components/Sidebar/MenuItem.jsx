export default function MenuItem({item, onToggle}) {
  return (
    <li>
      <span className="cursor-pointer" onClick={() => onToggle(item.id)}>{item.name}</span>
      {item.submenu.length > 0 && item.isOpen && (
        <ul>
          {item.submenu.map((submenuItem) => (
            <MenuItem key={submenuItem.id} item={submenuItem} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  )
}
